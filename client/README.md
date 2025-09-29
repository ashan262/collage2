# College Website Frontend

React frontend for the college website built with Vite, TailwindCSS, and modern React patterns.

## 🚀 Quick Start

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Setup environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env`:

   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_APP_NAME=F.G Degree College For Boys Kohat Website
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── ContactForm.jsx
│   ├── Faculty.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── Herocarousal.jsx
│   ├── NewsGrid.jsx
│   ├── Noticeboard.jsx
│   └── PageContent.jsx
├── pages/             # Page components
│   ├── About.jsx
│   ├── AdmissionDetail.jsx
│   ├── Admissions.jsx
│   ├── Contact.jsx
│   ├── Faculty.jsx
│   ├── Home.jsx
│   ├── NewsDetail.jsx
│   ├── PrincipalMessage.jsx
│   └── TimeTable.jsx
├── services/          # API service functions
├── utils/             # Utility functions
├── assets/            # Static assets
├── App.jsx            # Main app component
└── main.jsx           # Entry point
```

## 🎨 Technologies Used

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Toastify** - Toast notifications
- **Lucide React** - Modern icon library

## 🔗 Available Routes

- `/` - Homepage
- `/about` - About the college
- `/principal-message` - Principal's message
- `/admissions` - Admissions information
- `/admissions/:id` - Specific admission details
- `/faculty` - Faculty information
- `/timetable` - Class timetables
- `/news/:id` - News article details
- `/contact` - Contact form

## 🛠️ Build Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🎯 Features

- **Responsive Design** - Works on all device sizes
- **Modern UI** - Clean, professional interface
- **Fast Loading** - Optimized with Vite
- **SEO Friendly** - Proper meta tags and structure
- **Accessible** - WCAG compliant components
- **Toast Notifications** - User feedback system

## 🌐 Environment Variables

| Variable        | Description      | Default                     |
| --------------- | ---------------- | --------------------------- |
| `VITE_API_URL`  | Backend API URL  | `http://localhost:5000/api` |
| `VITE_APP_NAME` | Application name | `College Website`           |

## 📱 Responsive Breakpoints

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

Built with React + Vite for optimal performance and developer experience.
