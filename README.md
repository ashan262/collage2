# College Website - MERN Stack

A comprehensive public college website built with MongoDB, Express.js, React, and Node.js.

## 🌟 Features

### Frontend (React)

- 📱 Responsive design with TailwindCSS
- 🏠 Homepage with hero section and key information
- 📰 News and events display
- 🖼️ Photo gallery
- 📞 Contact form with validation
- 🎓 Academic programs and faculty information
- � Dynamic page content
- 🔗 Clean navigation and routing

### Backend (Node.js + Express)

- RESTful API design
- 🛡️ Security middleware (Helmet, Rate limiting)
- ✅ Data validation
- 🗄️ MongoDB with Mongoose ODM
- 📁 Static file serving for uploads

### Security Features

- 🛡️ Rate limiting to prevent abuse
- 🔐 Input validation and sanitization
- 🌐 CORS configuration
- 🔒 Environment variable protection

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Clone and navigate to server directory**

   ```bash
   cd server
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your configuration:

   ```env
   MONGO_URI=mongodb://localhost:27017/collegewebsite
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to client directory**

   ```bash
   cd client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env`:

   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_APP_NAME=F.G Degree College For Boys Kohat Website
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
collegeWebsite/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── utils/          # Utility functions
│   │   └── assets/         # Static assets
│   ├── public/
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── controllers/        # Route handlers
│   ├── config/             # Configuration files
│   ├── uploads/            # File uploads
│   └── package.json
└── README.md
```

## API Endpoints

### News

- `GET /api/news` - Get all published news
- `GET /api/news/:id` - Get single news item

### Gallery

- `GET /api/gallery` - Get all gallery images
- `GET /api/gallery/:id` - Get single gallery image

### Contact

- `POST /api/contact` - Submit contact form

### Page Content

- `GET /api/pages/:pageId` - Get page content

### Health Check

- `GET /api/health` - Server health status

## 🛠️ Development

### Backend Development

```bash
cd server
npm run dev  # Start with nodemon
```

### Frontend Development

```bash
cd client
npm run dev  # Start with Vite
```

### Database Operations

```bash
# Connect to MongoDB shell
mongosh collegewebsite
```

## 📱 Features in Detail

### Public Features

- **Homepage:** Hero section, news highlights, quick links
- **About:** College history, mission, vision
- **Principal Message:** Message from the principal
- **Academics:** Programs, courses, departments
- **Admissions:** Process, requirements, forms
- **Faculty:** Staff information and qualifications
- **Time Table:** Class schedules and timing
- **News & Events:** Latest announcements and activities
- **Gallery:** Campus photos and event images
- **Contact:** Contact form and location information

### Content Management

- **News:** Display published news articles with categories and search
- **Gallery:** Organized image galleries with categorization
- **Pages:** Dynamic page content management
- **Contact:** Form submissions stored in database

## 🎨 Styling

The project uses **TailwindCSS** for styling with:

- Custom color palette
- Responsive design breakpoints
- Component-based styling
- Dark mode support (optional)

## 🔒 Security Considerations

- Input validation and sanitization
- Rate limiting on API endpoints
- CORS configuration
- Environment variable protection
- File upload restrictions (for existing uploads)
- MongoDB injection prevention

## 🚀 Deployment

### Backend Deployment (Railway/Render)

1. Create account on Railway or Render
2. Connect your GitHub repository
3. Set environment variables
4. Deploy automatically

### Frontend Deployment (Netlify/Vercel)

1. Build the React app: `npm run build`
2. Deploy the `dist` folder
3. Configure redirects for SPA routing

### Database (MongoDB Atlas)

1. Create MongoDB Atlas cluster
2. Update MONGO_URI in environment variables
3. Whitelist deployment IP addresses
4. Import existing data if needed

## 📊 Data Models

The application uses the following MongoDB collections:

- **News:** Article content, categories, publication status
- **Gallery:** Image metadata, categories, display order
- **Contact:** Contact form submissions with status tracking
- **PageContent:** Dynamic page content for different sections

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:

- Email: support@fgckohat.edu.pk
- Documentation: [Project Wiki](link-to-wiki)
- Issues: [GitHub Issues](link-to-issues)

---

Built with ❤️ for educational excellence.
