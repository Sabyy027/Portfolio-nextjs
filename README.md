# Developer Portfolio - Next.js

A modern, professional portfolio website built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion. Features a dark theme with glassmorphism effects, inspired by premium developer portfolios.

## ✨ Features

- **Modern Design**: Clean, dark-themed UI with subtle animations and glassmorphism effects
- **Fully Responsive**: Optimized for all screen sizes from mobile to desktop
- **Type-Safe**: Built with TypeScript for robust code quality
- **Smooth Animations**: Powered by Framer Motion for elegant transitions
- **Admin Dashboard**: Built-in content management for projects, skills, certificates, and timeline
- **Local Storage**: Data persists using browser localStorage (easily adaptable to a backend)
- **SEO Optimized**: Proper meta tags and semantic HTML structure

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom theme
- **Animations**: Framer Motion
- **Icons**: Lucide React + Devicons
- **Fonts**: Inter & JetBrains Mono (Google Fonts)

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎨 Customization

### Update Personal Information

Edit the `INITIAL_PROFILE` in `types.ts`:

```typescript
export const INITIAL_PROFILE: UserProfile = {
  name: "Your Name",
  role: "Your Role",
  about: "Your bio",
  email: "your@email.com",
  resumeLink: "link-to-resume",
  githubLink: "https://github.com/yourusername",
  linkedinLink: "https://linkedin.com/in/yourusername"
};
```

### Manage Content

> **⚠️ IMPORTANT**: Before accessing the admin panel, you must set up your admin password:
> 1. Copy `.env.example` to `.env.local`
> 2. Set `NEXT_PUBLIC_ADMIN_PASSWORD` to your desired password
> 3. Restart the development server

1. Navigate to `/login` and enter your admin password
2. Access the admin dashboard to add/edit:
   - Projects
   - Skills  
   - Certificates
   - Learning Timeline

### Theme Customization

Modify colors in `app/globals.css` and Tailwind classes

## 📦 Build for Production

```bash
npm run build
npm start
```

## 📝 License

This project is open source and available under the MIT License.

---

**Made with ❤️ and Next.js**

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
