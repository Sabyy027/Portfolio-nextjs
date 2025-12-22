export enum SkillLevel {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
  Expert = 'Expert'
}

export enum ProjectCategory {
  Featured = 'Featured',
  Personal = 'Personal',
  Mini = 'Mini'
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  repoLink?: string;
  demoLink?: string;
  imageUrl: string;
  category: ProjectCategory;
  projectType?: string;
  isPublished: boolean;
  isFeatured: boolean;
  isOngoing?: boolean;
  order?: number;
  longDescription?: string;
  features?: string[];
}

export interface Skill {
  id: string;
  name: string;
  level: SkillLevel;
  iconClass?: string; // devicon class name
  category: 'q1' | 'q2' | 'q3' | 'q4'; // q1: Core, q2: Langs, q3: Tools, q4: Design
  order: number;
}

export type TimelineCategory = 'education' | 'experience' | 'project' | 'certification' | 'internship';

export interface LearningNode {
  id: string;
  title: string;
  date: string;
  description: string;
  category: TimelineCategory;
  institution?: string;
  tags?: string[];
  isHighlighted?: boolean;
  order?: number;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string; // Year or full date
  imageUrl: string;
  credentialLink?: string;
  isFeatured: boolean;
  priority?: number; // Higher number = higher priority (0-10)
  order: number;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate?: string; // If undefined, "Present"
  description: string;
}

export interface UserProfile {
  name: string;
  role: string;
  about: string;
  email: string;
  resumeLink: string;
  githubLink?: string;
  linkedinLink?: string;
  maintenanceMode?: boolean;
}

export const INITIAL_PROFILE: UserProfile = {
  name: "Sabeer Anwer Meeran",
  role: "Full Stack Engineer",
  about: "Passionate developer building scalable web applications with modern technologies.",
  email: "sabeeranwermeeran@gmail.com",
  resumeLink: "https://sabeer-anwer-meeran-resume.tiiny.site/",
  githubLink: "https://github.com/Sabyy027",
  linkedinLink: "https://www.linkedin.com/in/sabeeranwermeeran/",
  maintenanceMode: false
};
