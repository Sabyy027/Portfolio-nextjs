'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/Button';
import { api } from '@/lib/storage';
import { Project, ProjectCategory, Certificate, LearningNode, UserProfile, INITIAL_PROFILE } from '@/types';
import { Plus, Trash2, Star, Edit3, Save, X, Globe, Github as GithubIcon, Award, User, BookOpen, Layers, GripVertical, Settings } from 'lucide-react';

type Tab = 'projects' | 'certifications' | 'learning' | 'profile' | 'settings';

export default function AdminPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('projects');
  
  // Data States
  const [projects, setProjects] = useState<Project[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [nodes, setNodes] = useState<LearningNode[]>([]);
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);

  // Edit States
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [editingNode, setEditingNode] = useState<LearningNode | null>(null);

  // Drag and Drop States
  const [draggedNodeIndex, setDraggedNodeIndex] = useState<number | null>(null);
  const [dragOverNodeIndex, setDragOverNodeIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    fetchAllData();
  }, [isAuthenticated, router]);

  const fetchAllData = async () => {
    setProjects(await api.getProjects());
    setCertificates(await api.getCertificates());
    const learningNodes = await api.getLearningCurve();
    setNodes(learningNodes.sort((a, b) => (a.order || 0) - (b.order || 0)));
    setProfile(await api.getProfile());
  };

  if (!isAuthenticated) return null;

  // --- Handlers for Projects ---
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    try {
      await api.saveProject(editingProject);
      setProjects(await api.getProjects());
      setEditingProject(null);
    } catch (err: any) {
      alert(err.message || 'Failed to check project');
    }
  };
  const handleDeleteProject = async (id: string) => {
    if (confirm('Delete project?')) {
      await api.deleteProject(id);
      setProjects(await api.getProjects());
    }
  };

  // --- Handlers for Certifications ---
  // --- Handlers for Certifications ---
  const handleSaveCert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert) return;
    try {
      await api.saveCertificate(editingCert);
      setCertificates(await api.getCertificates());
      setEditingCert(null);
    } catch (err: any) {
      alert(err.message || 'Failed to save certificate');
    }
  };
  const handleDeleteCert = async (id: string) => {
    if (confirm('Delete certificate?')) {
      try {
        await api.deleteCertificate(id);
        setCertificates(await api.getCertificates());
      } catch (err: any) {
        alert(err.message || 'Failed to delete certificate');
      }
    }
  };

  // --- Handlers for Learning Curve ---
  const handleSaveNode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNode) return;
    try {
      await api.saveLearningNode(editingNode);
      const updatedNodes = await api.getLearningCurve();
      setNodes(updatedNodes.sort((a, b) => (a.order || 0) - (b.order || 0)));
      setEditingNode(null);
    } catch (err: any) {
      alert(err.message || 'Failed to save timeline event');
    }
  };
  const handleDeleteNode = async (id: string) => {
    if (confirm('Delete timeline node?')) {
      try {
        await api.deleteLearningNode(id);
        const updatedNodes = await api.getLearningCurve();
        setNodes(updatedNodes.sort((a, b) => (a.order || 0) - (b.order || 0)));
      } catch (err: any) {
        alert(err.message || 'Failed to delete timeline event');
      }
    }
  };

  // --- Drag and Drop Handlers for Learning Curve ---
  const handleDragStart = (index: number) => {
    setDraggedNodeIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverNodeIndex(index);
  };

  const handleDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedNodeIndex === null || draggedNodeIndex === dropIndex) {
      setDraggedNodeIndex(null);
      setDragOverNodeIndex(null);
      return;
    }

    // Reorder the nodes array
    const newNodes = [...nodes];
    const [draggedNode] = newNodes.splice(draggedNodeIndex, 1);
    newNodes.splice(dropIndex, 0, draggedNode);

    // Update order values
    const updatedNodes = newNodes.map((node, idx) => ({
      ...node,
      order: idx
    }));

    setNodes(updatedNodes);
    setDraggedNodeIndex(null);
    setDragOverNodeIndex(null);

    // Save all nodes with updated order
    try {
      await Promise.all(updatedNodes.map(node => api.saveLearningNode(node)));
      alert('Timeline order updated successfully!');
    } catch (err: any) {
      alert(err.message || 'Failed to save timeline order');
    }
  };

  const handleDragEnd = () => {
    setDraggedNodeIndex(null);
    setDragOverNodeIndex(null);
  };

  // --- Handlers for Profile ---
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving profile with maintenanceMode:', profile.maintenanceMode);
    await api.updateProfile(profile);
    // Refresh profile from database to ensure UI reflects saved state
    const updatedProfile = await api.getProfile();
    setProfile(updatedProfile);
    console.log('Profile saved and refreshed. maintenanceMode is now:', updatedProfile.maintenanceMode);
    alert('Settings saved successfully!');
  };

  // --- New Item Generators ---
  const newProject = () => setEditingProject({
    id: '', title: '', description: '', techStack: [], 
    imageUrl: 'https://picsum.photos/600/400?random=' + Math.random(), 
    category: ProjectCategory.Personal, projectType: 'Full Stack Web App', isPublished: true, isFeatured: false 
  });
  
  const newCert = () => setEditingCert({
    id: '', name: '', issuer: '', date: new Date().getFullYear().toString(), 
    imageUrl: 'https://picsum.photos/100/100?random=' + Math.random(), 
    credentialLink: '', isFeatured: false, order: 0
  });

  const newNode = () => setEditingNode({
    id: '', title: '', description: '', date: new Date().getFullYear().toString(), 
    category: 'education', institution: '', tags: [], isHighlighted: false, order: 0
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <Navbar toggleTheme={() => {}} isDark={true} />
      
      <div className="max-w-6xl mx-auto px-4 pt-32 pb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">CMS Dashboard</h1>
            <p className="text-zinc-500 mt-2">Manage all your portfolio content in one place.</p>
          </div>
          
          {/* Action Buttons based on Tab */}
          {activeTab === 'projects' && (
            <Button onClick={newProject} className="gap-2"><Plus size={18} /> New Project</Button>
          )}
          {activeTab === 'certifications' && (
            <Button onClick={newCert} className="gap-2"><Plus size={18} /> New Certificate</Button>
          )}
          {activeTab === 'learning' && (
            <Button onClick={newNode} className="gap-2"><Plus size={18} /> New Timeline Event</Button>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 border-b border-zinc-800">
          {[
            { id: 'projects', label: 'Projects', icon: Layers },
            { id: 'certifications', label: 'Certifications', icon: Award },
            { id: 'learning', label: 'Learning Curve', icon: BookOpen },
            { id: 'profile', label: 'Profile & About', icon: User },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                activeTab === tab.id 
                  ? 'bg-zinc-100 text-zinc-950 font-semibold' 
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* --- PROJECTS TAB --- */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-zinc-900/50 border border-white/5 rounded-3xl p-6 hover:border-zinc-700 transition-all group relative">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] uppercase font-bold text-green-400 bg-green-400/10 px-3 py-1 rounded-full border border-green-400/20">{project.category}</span>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingProject(project)} className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white"><Edit3 size={16} /></button>
                    <button onClick={() => handleDeleteProject(project.id)} className="p-2 hover:bg-red-500/10 rounded-full text-zinc-400 hover:text-red-400"><Trash2 size={16} /></button>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-sm text-zinc-400 line-clamp-2 mb-4">{project.description}</p>
                {project.isFeatured && <div className="absolute bottom-6 right-6 text-yellow-500"><Star size={16} fill="currentColor" /></div>}
              </div>
            ))}
          </div>
        )}

        {/* --- CERTIFICATIONS TAB --- */}
        {activeTab === 'certifications' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <div key={cert.id} className="bg-zinc-900/50 border border-white/5 rounded-3xl p-6 hover:border-zinc-700 transition-all flex items-center gap-4">
                <img src={cert.imageUrl} alt={cert.issuer} className="w-12 h-12 object-contain bg-white rounded-lg p-1" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold truncate">{cert.name}</h3>
                  <p className="text-sm text-zinc-400">{cert.issuer}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <button onClick={() => setEditingCert(cert)} className="p-1.5 hover:bg-zinc-800 rounded text-zinc-400"><Edit3 size={14} /></button>
                  <button onClick={() => handleDeleteCert(cert.id)} className="p-1.5 hover:bg-red-500/10 rounded text-zinc-400 hover:text-red-400"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- LEARNING CURVE TAB --- */}
        {activeTab === 'learning' && (
          <div className="space-y-4">
            {nodes.map((node, index) => (
              <div 
                key={node.id} 
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                className={`bg-zinc-900/50 border rounded-2xl p-6 flex justify-between items-center group cursor-move transition-all ${
                  draggedNodeIndex === index 
                    ? 'opacity-50 border-green-500/50' 
                    : dragOverNodeIndex === index 
                      ? 'border-green-500 bg-zinc-800/50' 
                      : 'border-white/5 hover:border-zinc-700'
                }`}
              >
                {/* Drag Handle */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="text-zinc-600 hover:text-zinc-400 cursor-grab active:cursor-grabbing">
                    <GripVertical size={20} />
                  </div>
                  
                  {/* Order Number Badge */}
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 text-sm font-bold">
                    {index + 1}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-lg break-words">{node.title}</h3>
                      <span className="text-xs font-mono text-zinc-500">{node.date}</span>
                      <span className="text-[10px] uppercase font-bold text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full">{node.category}</span>
                    </div>
                    <p className="text-zinc-400 text-sm max-w-2xl break-words">{node.description}</p>
                  </div>
                </div>
                
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setEditingNode(node)} className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400"><Edit3 size={16} /></button>
                  <button onClick={() => handleDeleteNode(node.id)} className="p-2 hover:bg-red-500/10 rounded-full text-zinc-400 hover:text-red-400"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- PROFILE TAB --- */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto bg-zinc-900/50 border border-white/5 rounded-3xl p-8">
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-500 uppercase">Full Name</label>
                <input value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="w-full bg-zinc-950 border border-white/10 rounded-full px-4 py-2" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-500 uppercase">Role / Title</label>
                <input value={profile.role} onChange={e => setProfile({...profile, role: e.target.value})} className="w-full bg-zinc-950 border border-white/10 rounded-full px-4 py-2" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-500 uppercase">About Me (Markdown Supported)</label>
                <textarea rows={6} value={profile.about} onChange={e => setProfile({...profile, about: e.target.value})} className="w-full bg-zinc-950 border border-white/10 rounded-2xl px-4 py-3 resize-y" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                   <label className="text-xs font-mono text-zinc-500 uppercase">GitHub Link</label>
                   <input value={profile.githubLink} onChange={e => setProfile({...profile, githubLink: e.target.value})} className="w-full bg-zinc-950 border border-white/10 rounded-full px-4 py-2" />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-mono text-zinc-500 uppercase">LinkedIn Link</label>
                   <input value={profile.linkedinLink} onChange={e => setProfile({...profile, linkedinLink: e.target.value})} className="w-full bg-zinc-950 border border-white/10 rounded-full px-4 py-2" />
                </div>
              </div>
              
              <Button type="submit" className="w-full">Save Profile Changes</Button>
            </form>
          </div>
        )}

        {/* --- SETTINGS TAB --- */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto bg-zinc-900/50 border border-white/5 rounded-3xl p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-zinc-100 mb-2">Site Settings</h2>
              <p className="text-zinc-400">Manage global site configurations and features</p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-6">
              {/* Maintenance Mode Toggle */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-6 bg-zinc-950 border border-white/10 rounded-2xl hover:border-zinc-700 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-zinc-100">Maintenance Banner</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${profile.maintenanceMode ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-zinc-700/50 text-zinc-500'}`}>
                        {profile.maintenanceMode ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-400">
                      Display "⚠️ Updates in progress - new content coming soon!" banner on homepage
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer ml-4">
                    <input 
                      type="checkbox" 
                      checked={profile.maintenanceMode || false} 
                      onChange={e => setProfile({...profile, maintenanceMode: e.target.checked})} 
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-zinc-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>
              </div>

              <Button type="submit" className="w-full">Save Settings</Button>
            </form>
          </div>
        )}

        {/* --- MODALS --- */}
        
        {/* Project Modal */}
        {editingProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
             <div className="bg-zinc-900 w-full max-w-2xl rounded-3xl p-8 max-h-[90vh] overflow-y-auto border border-white/10">
               <h2 className="text-2xl font-bold mb-6">Edit Project</h2>
                 <form onSubmit={handleSaveProject} className="space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                   <input placeholder="Title" value={editingProject.title} onChange={e => setEditingProject({...editingProject, title: e.target.value})} className="bg-zinc-950 border border-white/10 p-3 rounded-lg" required /> 
                   <input placeholder="Project Type (e.g. Full Stack)" value={editingProject.projectType || ''} onChange={e => setEditingProject({...editingProject, projectType: e.target.value})} className="bg-zinc-950 border border-white/10 p-3 rounded-lg" />
                 </div>
                 <textarea placeholder="Description (Short)" value={editingProject.description} onChange={e => setEditingProject({...editingProject, description: e.target.value})} className="w-full bg-zinc-950 border border-white/10 p-3 rounded-lg h-24" required />
                 <textarea placeholder="Long Description (Optional - for Modal)" value={editingProject.longDescription || ''} onChange={e => setEditingProject({...editingProject, longDescription: e.target.value})} className="w-full bg-zinc-950 border border-white/10 p-3 rounded-lg h-32" />
                 <input placeholder="Key Features (comma sep)" value={editingProject.features?.join(', ') || ''} onChange={e => setEditingProject({...editingProject, features: e.target.value.split(',').map(s=>s.trim())})} className="w-full bg-zinc-950 border border-white/10 p-3 rounded-lg" />
                 
                 <div className="grid grid-cols-2 gap-4">
                    <input placeholder="GitHub Repo Link (Optional)" value={editingProject.repoLink || ''} onChange={e => setEditingProject({...editingProject, repoLink: e.target.value})} className="bg-zinc-950 border border-white/10 p-3 rounded-lg" />
                    <input placeholder="Live Demo Link (Optional)" value={editingProject.demoLink || ''} onChange={e => setEditingProject({...editingProject, demoLink: e.target.value})} className="bg-zinc-950 border border-white/10 p-3 rounded-lg" />
                 </div>
                 <input placeholder="Image URL" value={editingProject.imageUrl} onChange={e => setEditingProject({...editingProject, imageUrl: e.target.value})} className="w-full bg-zinc-950 border border-white/10 p-3 rounded-lg" required />
                 
                 <div className="grid grid-cols-2 gap-4">
                    <input placeholder="Tech Stack (comma sep)" value={editingProject.techStack.join(', ')} onChange={e => setEditingProject({...editingProject, techStack: e.target.value.split(',').map(s=>s.trim())})} className="bg-zinc-950 border border-white/10 p-3 rounded-lg" />
                    <select value={editingProject.category} onChange={e => setEditingProject({...editingProject, category: e.target.value as ProjectCategory})} className="bg-zinc-950 border border-white/10 p-3 rounded-lg">
                      <option value="Featured">Featured</option>
                      <option value="Personal">Personal</option>
                      <option value="Mini">Mini</option>
                    </select>
                 </div>
                 
                 <div className="flex gap-4">
                   <label className="flex items-center gap-2"><input type="checkbox" checked={editingProject.isFeatured} onChange={e => setEditingProject({...editingProject, isFeatured: e.target.checked})} /> Featured</label>
                   <label className="flex items-center gap-2"><input type="checkbox" checked={editingProject.isPublished} onChange={e => setEditingProject({...editingProject, isPublished: e.target.checked})} /> Published</label>
                 </div>

                 <div className="flex gap-4 mt-6">
                   <Button type="submit" className="flex-1">Save</Button>
                   <Button type="button" variant="outline" onClick={() => setEditingProject(null)}>Cancel</Button>
                 </div>
               </form>
             </div>
          </div>
        )}

        {/* Certification Modal */}
        {editingCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
             <div className="bg-zinc-900 w-full max-w-lg rounded-3xl p-8 border border-white/10">
               <h2 className="text-2xl font-bold mb-6">Edit Certification</h2>
               <form onSubmit={handleSaveCert} className="space-y-4">
                 <input placeholder="Certificate Name" value={editingCert.name} onChange={e => setEditingCert({...editingCert, name: e.target.value})} className="w-full bg-zinc-950 border border-white/10 p-3 rounded-lg" required />
                 <input placeholder="Issuer (e.g. Google, Udemy)" value={editingCert.issuer} onChange={e => setEditingCert({...editingCert, issuer: e.target.value})} className="w-full bg-zinc-950 border border-white/10 p-3 rounded-lg" required />
                 <div className="grid grid-cols-2 gap-4">
                   <input placeholder="Date / Year" value={editingCert.date} onChange={e => setEditingCert({...editingCert, date: e.target.value})} className="bg-zinc-950 border border-white/10 p-3 rounded-lg" required />
                   <input placeholder="Link" value={editingCert.credentialLink} onChange={e => setEditingCert({...editingCert, credentialLink: e.target.value})} className="bg-zinc-950 border border-white/10 p-3 rounded-lg" />
                 </div>
                 <input placeholder="Image URL" value={editingCert.imageUrl} onChange={e => setEditingCert({...editingCert, imageUrl: e.target.value})} className="w-full bg-zinc-950 border border-white/10 p-3 rounded-lg" required />
                 
                 <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={editingCert.isFeatured} onChange={e => setEditingCert({...editingCert, isFeatured: e.target.checked})} className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 focus:ring-green-500 text-green-500" /> 
                      <span className="text-zinc-300">Featured on Homepage</span>
                    </label>
                 </div>
                 <div className="flex gap-4">
                   <Button type="submit" className="flex-1">Save</Button>
                   <Button type="button" variant="outline" onClick={() => setEditingCert(null)}>Cancel</Button>
                 </div>
               </form>
             </div>
          </div>
        )}

        {/* Learning Node Modal */}
        {editingNode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
             <div className="bg-zinc-900 w-full max-w-lg rounded-3xl p-8 border border-white/10">
               <h2 className="text-2xl font-bold mb-6">Edit Timeline Event</h2>
                <form onSubmit={handleSaveNode} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input placeholder="Title (e.g. BSc Computer Science)" value={editingNode.title} onChange={e => setEditingNode({...editingNode, title: e.target.value})} className="bg-zinc-950 border border-white/10 p-3 rounded-lg" required />
                    <select value={editingNode.category} onChange={e => setEditingNode({...editingNode, category: e.target.value as any})} className="bg-zinc-950 border border-white/10 p-3 rounded-lg">
                      <option value="education">Education</option>
                      <option value="experience">Experience</option>
                      <option value="project">Project</option>
                      <option value="certification">Certification</option>
                      <option value="internship">Internship</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input placeholder="Date / Period" value={editingNode.date} onChange={e => setEditingNode({...editingNode, date: e.target.value})} className="bg-zinc-950 border border-white/10 p-3 rounded-lg" required />
                    <input placeholder="Institution / Company" value={editingNode.institution || ''} onChange={e => setEditingNode({...editingNode, institution: e.target.value})} className="bg-zinc-950 border border-white/10 p-3 rounded-lg" />
                  </div>
                  <textarea placeholder="Description" value={editingNode.description} onChange={e => setEditingNode({...editingNode, description: e.target.value})} className="w-full bg-zinc-950 border border-white/10 p-3 rounded-lg h-32 break-words whitespace-pre-wrap" required />
                  <input placeholder="Tags (comma sep)" value={editingNode.tags?.join(', ') || ''} onChange={e => setEditingNode({...editingNode, tags: e.target.value.split(',').map(s=>s.trim())})} className="w-full bg-zinc-950 border border-white/10 p-3 rounded-lg" />
                  
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2"><input type="checkbox" checked={editingNode.isHighlighted} onChange={e => setEditingNode({...editingNode, isHighlighted: e.target.checked})} /> Highlighted (Major Achievement)</label>
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" className="flex-1">Save</Button>
                    <Button type="button" variant="outline" onClick={() => setEditingNode(null)}>Cancel</Button>
                  </div>
                </form>
             </div>
          </div>
        )}

      </div>
    </div>
  );
}

