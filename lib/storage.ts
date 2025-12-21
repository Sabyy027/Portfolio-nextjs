import { Project, UserProfile, INITIAL_PROFILE, Certificate, LearningNode } from '../types';

/**
 * This service now talks to the Next.js API routes which connect to MongoDB.
 */

export const api = {
  // Profile
  getProfile: async (): Promise<UserProfile> => {
    try {
      const res = await fetch('/api/profile');
      if (!res.ok) throw new Error('Failed to fetch profile');
      return await res.json();
    } catch (error) {
      console.error(error);
      return INITIAL_PROFILE;
    }
  },
  
  updateProfile: async (data: UserProfile): Promise<void> => {
    try {
      await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error(error);
    }
  },

  // Projects
  getProjects: async (): Promise<Project[]> => {
    try {
      const res = await fetch('/api/projects');
      if (!res.ok) throw new Error('Failed to fetch projects');
      const data = await res.json();
      // Map MongoDB _id to frontend id
      return data.map((p: any) => ({ ...p, id: p._id }));
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  saveProject: async (project: Project): Promise<void> => {
    try {
      const isNew = !project.id || project.id === '';
      const url = isNew ? '/api/projects' : `/api/projects/${project.id}`;
      const method = isNew ? 'POST' : 'PUT';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      });
      
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to save project');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  deleteProject: async (id: string): Promise<void> => {
    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    } catch (error) {
      console.error(error);
    }
  },

  // Skills (Still mock for now as per request - sticking to 3 sections first)
  getSkills: () => [],

  // Certificates
  getCertificates: async (): Promise<Certificate[]> => {
    try {
      const res = await fetch('/api/certifications');
      if (!res.ok) throw new Error('Failed to fetch certifications');
      const data = await res.json();
      return data.map((c: any) => ({ ...c, id: c._id }));
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  saveCertificate: async (cert: Certificate): Promise<void> => {
    try {
      const isNew = !cert.id || cert.id === '';
      const url = isNew ? '/api/certifications' : `/api/certifications/${cert.id}`;
      const method = isNew ? 'POST' : 'PUT';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cert),
      });
      
      if (!res.ok) throw new Error('Failed to save certification');
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  deleteCertificate: async (id: string): Promise<void> => {
    try {
      const res = await fetch(`/api/certifications/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        throw new Error('Failed to delete certification');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Learning Curve
  getLearningCurve: async (): Promise<LearningNode[]> => {
    try {
      const res = await fetch('/api/learning');
      if (!res.ok) throw new Error('Failed to fetch learning curve');
      const data = await res.json();
      return data.map((l: any) => ({ ...l, id: l._id }));
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  saveLearningNode: async (node: LearningNode): Promise<void> => {
    try {
      const isNew = !node.id || node.id === '';
      const url = isNew ? '/api/learning' : `/api/learning/${node.id}`;
      const method = isNew ? 'POST' : 'PUT';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(node),
      });
      
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to save learning node');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  deleteLearningNode: async (id: string): Promise<void> => {
    try {
      await fetch(`/api/learning/${id}`, { method: 'DELETE' });
    } catch (error) {
      console.error(error);
    }
  },
};
