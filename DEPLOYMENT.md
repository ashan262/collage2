# 🚀 Federal Government Degree College Kohat - Production Deployment Guide

## 📋 Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Environment Setup](#environment-setup)
3. [Database Configuration](#database-configuration)
4. [Security Configuration](#security-configuration)
5. [Deployment Methods](#deployment-methods)
6. [Post-Deployment Verification](#post-deployment-verification)
7. [Monitoring & Maintenance](#monitoring--maintenance)
8. [Troubleshooting](#troubleshooting)

---

## 🔍 Pre-Deployment Checklist

### ✅ **Code Quality & Testing**

- [ ] All lint errors fixed (`npm run lint` in client)
- [ ] Client builds successfully (`npm run build`)
- [ ] Server starts without errors (`npm start`)
- [ ] All environment variables configured
- [ ] Database connection tested
- [ ] Admin user created and tested
- [ ] File uploads working correctly
- [ ] API endpoints tested

### ✅ **Security Requirements**

- [ ] JWT secret changed from default
- [ ] Strong database passwords set
- [ ] CORS configured for production domain
- [ ] Rate limiting configured
- [ ] File upload restrictions in place
- [ ] HTTPS certificates obtained
- [ ] Security headers implemented

### ✅ **Performance Optimization**

- [ ] Client bundle optimized (chunking enabled)
- [ ] Images optimized and compressed
- [ ] Database indexes created
- [ ] CDN configured (optional)
- [ ] Caching strategies implemented

---

## 🌍 Environment Setup

### **1. Server Environment Variables**

Create `server/.env` with production values:

```bash
# MongoDB Configuration - Use MongoDB Atlas
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/collegewebsite

# JWT Configuration - CHANGE THESE
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
JWT_EXPIRE=7d

# Server Configuration
PORT=5000
NODE_ENV=production

# File Upload Configuration
MAX_FILE_SIZE=5242880  # 5MB
UPLOAD_PATH=./uploads

# Frontend URL for CORS
CLIENT_URL=https://your-domain.com

# Security Configuration
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100
```

### **2. Client Environment Variables**

Create `client/.env` with production values:

```bash
# API Configuration
VITE_API_URL=https://your-api-domain.com/api

# Application Configuration
VITE_APP_NAME=Federal Government Degree College For Boys Kohat Cantt
VITE_APP_VERSION=1.0.0

# Contact Information
VITE_COLLEGE_NAME=Federal Government Degree College For Boys Kohat Cantt
VITE_COLLEGE_ADDRESS=Federal Government Degree College For Boys Dhoda Road Kohat Cantt
VITE_COLLEGE_PHONE=0333-6040021
VITE_COLLEGE_EMAIL=fgdcbkohat@gmail.com

# Social Media
VITE_FACEBOOK_URL=https://www.facebook.com/share/16NHH6K1Np/
VITE_TWITTER_URL=#
VITE_YOUTUBE_URL=#
```

---

## 🗄️ Database Configuration

### **MongoDB Atlas Setup (Recommended)**

1. **Create MongoDB Atlas Account**

   - Go to [MongoDB Atlas](https://cloud.mongodb.com/)
   - Create free cluster or choose paid plan
   - Create database user with strong password
   - Whitelist IP addresses (0.0.0.0/0 for all IPs or specific server IPs)

2. **Connection String**

   ```bash
   mongodb+srv://username:password@cluster.mongodb.net/collegewebsite
   ```

3. **Database Initialization**
   ```bash
   cd server
   npm run seed  # Creates admin users
   ```

### **Self-Hosted MongoDB (Alternative)**

```bash
# Install MongoDB
# Ubuntu/Debian
sudo apt-get install mongodb

# Start MongoDB service
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Connection string
MONGO_URI=mongodb://localhost:27017/collegewebsite
```

---

## 🔒 Security Configuration

### **1. SSL/TLS Certificate**

- **Option A: Let's Encrypt (Free)**

  ```bash
  sudo apt install certbot
  sudo certbot certonly --standalone -d your-domain.com
  ```

- **Option B: Cloudflare (Free)**
  - Use Cloudflare proxy with automatic SSL

### **2. Firewall Configuration**

```bash
# UFW (Ubuntu)
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 5000/tcp  # API port
sudo ufw enable
```

### **3. Process Manager (PM2)**

```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start ecosystem.config.js

# Set up startup script
pm2 startup
pm2 save
```

---

## 🚀 Deployment Methods

### **Method 1: Traditional VPS/Server Deployment**

#### **1. Server Setup**

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js (v18+)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Git
sudo apt-get install git

# Clone repository
git clone https://github.com/your-username/collegeWebsite.git
cd collegeWebsite
```

#### **2. Build and Deploy**

```bash
# Install dependencies
cd server && npm install
cd ../client && npm install

# Build client
npm run build

# Move build files to server
cp -r dist/* ../server/public/

# Start server
cd ../server
npm start
```

#### **3. Process Management with PM2**

Create `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [
    {
      name: "college-website",
      script: "server.js",
      cwd: "/path/to/collegeWebsite/server",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 5000,
      },
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_file: "./logs/combined.log",
      time: true,
    },
  ],
};
```

### **Method 2: Docker Deployment**

#### **1. Create Dockerfiles**

**Server Dockerfile:**

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

**Client Dockerfile:**

```dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
```

#### **2. Docker Compose**

```yaml
version: "3.8"

services:
  client:
    build: ./client
    ports:
      - "80:80"
    depends_on:
      - server

  server:
    build: ./server
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - MONGO_URI=${MONGO_URI}
      - JWT_SECRET=${JWT_SECRET}
    volumes:
      - ./uploads:/app/uploads

  mongodb:
    image: mongo:latest
    environment:
      - MONGO_INITDB_ROOT_USERNAME=${MONGO_USERNAME}
      - MONGO_INITDB_ROOT_PASSWORD=${MONGO_PASSWORD}
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

### **Method 3: Cloud Platform Deployment**

#### **Vercel (Client)**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy client
cd client
vercel --prod
```

#### **Railway/Render (Server)**

1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically on push

---

## ✅ Post-Deployment Verification

### **1. Health Checks**

```bash
# Test API endpoints
curl https://your-api-domain.com/api/health
curl https://your-api-domain.com/api/news

# Test admin login
curl -X POST https://your-api-domain.com/api/admin/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@fgdckohat.edu.pk","password":"your-password"}'
```

### **2. Performance Testing**

```bash
# Install Apache Bench
sudo apt-get install apache2-utils

# Test website performance
ab -n 100 -c 10 https://your-domain.com/
ab -n 50 -c 5 https://your-api-domain.com/api/news
```

### **3. Security Testing**

- Test HTTPS certificate
- Verify security headers
- Check rate limiting
- Test file upload restrictions

---

## 📊 Monitoring & Maintenance

### **1. Server Monitoring**

```bash
# PM2 monitoring
pm2 monit

# System monitoring
htop
df -h  # Disk usage
free -h  # Memory usage
```

### **2. Log Management**

```bash
# View application logs
pm2 logs college-website

# Rotate logs
pm2 install pm2-logrotate
```

### **3. Backup Strategy**

```bash
# Database backup (MongoDB)
mongodump --uri="mongodb+srv://username:password@cluster.mongodb.net/collegewebsite" --out ./backup

# File uploads backup
tar -czf uploads-backup-$(date +%Y%m%d).tar.gz uploads/
```

### **4. SSL Certificate Renewal**

```bash
# Auto-renewal with certbot
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

---

## 🔧 Troubleshooting

### **Common Issues**

#### **1. Build Failures**

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node.js version
node --version  # Should be 16+
```

#### **2. Database Connection Issues**

- Check MongoDB Atlas IP whitelist
- Verify connection string format
- Test network connectivity

#### **3. File Upload Issues**

```bash
# Check upload directory permissions
chmod 755 uploads/
chown -R $USER:$USER uploads/
```

#### **4. Memory Issues**

```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
```

---

## 🚨 Emergency Procedures

### **Rollback Deployment**

```bash
# Using PM2
pm2 stop college-website
git checkout previous-commit
npm install
npm run build
pm2 restart college-website
```

### **Database Restore**

```bash
mongorestore --uri="mongodb+srv://username:password@cluster.mongodb.net/collegewebsite" ./backup
```

---

## 📞 Support Contacts

- **System Administrator**: admin@fgdckohat.edu.pk
- **Technical Support**: tech@fgdckohat.edu.pk
- **Emergency**: 0333-6040021

---

**Last Updated**: September 2025
**Version**: 1.0.0
