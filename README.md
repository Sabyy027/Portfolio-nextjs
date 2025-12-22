# 🚀 Modern Portfolio Website

A stunning, full-stack portfolio website built with Next.js 15, featuring a dynamic admin panel, MongoDB integration, and beautiful animations. Perfect for developers who want to showcase their work with style.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎨 **Beautiful UI/UX**
- **Dark Theme Design** with vibrant gradient accents
- **Glassmorphism Effects** for modern aesthetics
- **Smooth Animations** powered by Framer Motion
- **Responsive Design** - looks great on all devices
- **Interactive Components** with hover effects and micro-animations

### 📊 **Dynamic Content Management**
- **Admin Dashboard** - Full CRUD operations for all content
- **Project Showcase** - Display your work with custom ordering
- **Certifications Carousel** - Highlight your achievements with priority system
- **Learning Journey Timeline** - Showcase your professional growth
- **Maintenance Mode** - Control site-wide notifications

### 🔐 **Authentication & Security**
- **Password-based Authentication** for secure admin access
- **Protected Routes** - Admin panel accessible only to authenticated users
- **Environment Variables** for sensitive data
- **localStorage** for session persistence

### 🎯 **Advanced Features**
- **Priority System** for certifications (15-second featured display)
- **Custom Ordering** for projects and content
- **Drag & Drop Reordering** for timeline events
- **Modal Previews** for detailed project views
- **Smooth Scrolling** with clean URLs (no hash fragments)
- **SEO Optimized** with proper meta tags and semantic HTML

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icon set

### **Backend**
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB ODM
- **Next.js API Routes** - Serverless functions
- **React Context** - Authentication state management

### **Development Tools**
- **ESLint** - Code linting
- **Git** - Version control
- **VS Code** - Recommended IDE

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- Git installed

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/portfolio-nextjs.git
cd portfolio-nextjs
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# Admin Password (for login)
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password_here

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Security Note:** For production, consider implementing proper JWT authentication or using a service like NextAuth.js.

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables:
     - `MONGODB_URI`
     - `NEXT_PUBLIC_ADMIN_PASSWORD`
   - Deploy!

3. **Update Environment Variable**
```env
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

### Build for Production
```bash
npm run build
npm start
```

## 📖 Usage Guide

### Admin Panel Access

1. **Navigate to Login**
   - Go to `/login`
   - Default credentials are set in your database

2. **Admin Dashboard**
   - Access at `/admin` after login
   - Manage all content from one place

### Content Management

#### **Projects**
- Add/Edit/Delete projects
- Set custom display order (1, 2, 3...)
- Mark as featured for homepage
- Add long descriptions and features
- Upload project images

#### **Certifications**
- Add/Edit/Delete certifications
- Set priority (0-10) for carousel ordering
- Featured certificates appear on homepage
- Highest priority shows first for 15 seconds

#### **Learning Journey**
- Add education, experience, internships
- Drag & drop to reorder timeline events
- Highlight important milestones
- Add tags and descriptions

#### **Profile & Settings**
- Update personal information
- Manage social links
- Toggle maintenance banner
- Update resume link

## 🎨 Customization

### Colors & Theme
Edit `tailwind.config.ts` to customize colors:
```typescript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      // Add your custom colors
    }
  }
}
```

### Components
All components are in `/components` directory:
- `Hero.tsx` - Landing section
- `Projects.tsx` - Project showcase
- `Certificates.tsx` - Certification carousel
- `LearningCurve.tsx` - Timeline
- `Contact.tsx` - Contact section

### Fonts
Update fonts in `app/layout.tsx`:
```typescript
import { Inter, Outfit } from 'next/font/google'
```

## 📁 Project Structure

```
portfolio-nextjs/
├── app/
│   ├── admin/              # Admin dashboard
│   ├── api/                # API routes
│   │   ├── auth/          # Authentication
│   │   ├── certifications/
│   │   ├── learning/
│   │   ├── profile/
│   │   └── projects/
│   ├── certifications/     # Certifications page
│   ├── login/             # Login page
│   ├── projects/          # Projects page
│   └── layout.tsx         # Root layout
├── components/            # React components
├── context/              # React context (Auth)
├── lib/                  # Utilities
│   ├── db.ts            # MongoDB connection
│   └── storage.ts       # API client
├── models/              # Mongoose models
│   ├── Certification.ts
│   ├── LearningNode.ts
│   ├── Profile.ts
│   └── Project.ts
├── public/              # Static assets
├── types.ts             # TypeScript types
└── tailwind.config.ts   # Tailwind configuration
```

## 🔧 API Endpoints

### Profile
- `GET /api/profile` - Get profile
- `POST /api/profile` - Update profile

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

### Certifications
- `GET /api/certifications` - Get all certifications
- `POST /api/certifications` - Create certification
- `PUT /api/certifications/[id]` - Update certification
- `DELETE /api/certifications/[id]` - Delete certification

### Learning Journey
- `GET /api/learning` - Get timeline
- `POST /api/learning` - Create event
- `PUT /api/learning/[id]` - Update event
- `DELETE /api/learning/[id]` - Delete event

## 🎯 Key Features Explained

### 1. **Priority System for Certifications**
- Set priority 0-10 for each certification
- Higher priority (10) appears first
- Featured certificate shows for 15 seconds before carousel starts
- Perfect for highlighting your most important achievements

### 2. **Project Ordering**
- Assign order numbers (1, 2, 3...) to projects
- Lower numbers appear first
- Full control over project display sequence
- Works across homepage and projects page

### 3. **Maintenance Banner**
- Toggle from admin settings
- Shows notification at top of homepage
- Dismissible by users (stored in localStorage)
- Perfect for announcing updates

### 4. **Smooth Navigation**
- Click "About" or "Journey" in navbar
- Smoothly scrolls to section
- No hash (#) in URL
- Clean, professional URLs

### 5. **Modal Scroll Lock**
- Opening project modal locks background scroll
- Only modal content scrolls
- Better UX and prevents confusion

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check your connection string
# Ensure IP whitelist includes your IP
# Verify database user credentials
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Authentication Issues
```bash
# Verify NEXT_PUBLIC_ADMIN_PASSWORD is set
# Check localStorage for 'portfolio_auth_token'
# Clear browser localStorage and try again
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Sabeer Anwer Meeran**
- Portfolio: [sabeeranwermeeran.dev](https://www.sabeeranwermeeran.dev)
- GitHub: [@Sabyy027](https://github.com/Sabyy027)
- LinkedIn: [Sabeer Anwer Meeran](https://www.linkedin.com/in/sabeeranwermeeran/)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting
- MongoDB for the database
- Framer Motion for animations
- Tailwind CSS for styling utilities

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/portfolio-nextjs/issues).

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

**Built with ❤️ using Next.js and TypeScript**
