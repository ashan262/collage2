# 🐳 Docker Deployment Guide - F.G. Degree College Kohat Website

## 📋 Overview

This guide provides comprehensive instructions for deploying the F.G. Degree College Kohat website using Docker containers. The setup includes the web application, MongoDB database, and optional Nginx reverse proxy.

---

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     Nginx       │    │   Web App       │    │    MongoDB      │
│  (Port 80/443)  │───▶│   (Port 5000)   │───▶│   (Port 27017)  │
│   Reverse Proxy │    │   Node.js/React │    │    Database     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 🚀 Quick Start

### 1. **Prerequisites**

```bash
# Install Docker and Docker Compose
docker --version
docker-compose --version
```

### 2. **Environment Setup**

```bash
# Copy and configure environment variables
cp .env.docker .env

# Edit the .env file with your production values
nano .env
```

### 3. **Deploy with Docker Compose**

```bash
# Build and start all services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f webapp
```

---

## 📁 Files Structure

```
collegeWebsite/
├── Dockerfile                 # Multi-stage build configuration
├── docker-compose.yml         # Services orchestration
├── .env.docker               # Environment template
├── mongo-init.js             # Database initialization
├── nginx.conf                # Nginx configuration (optional)
├── server/healthcheck.js     # Health check script
└── ecosystem.config.js       # PM2 configuration (alternative)
```

---

## ⚙️ Configuration Files

### **Dockerfile**

- **Multi-stage build**: Optimized for production
- **Security**: Non-root user, minimal attack surface
- **Health checks**: Built-in container health monitoring
- **Static assets**: Efficient serving of React build

### **docker-compose.yml**

- **Services**: MongoDB, Web App, Nginx (optional)
- **Networks**: Isolated container communication
- **Volumes**: Persistent data storage
- **Health checks**: Service dependency management

### **Environment Variables (.env)**

```bash
# Database
MONGO_ROOT_PASSWORD=your_secure_password
WEBAPP_DB_PASSWORD=your_webapp_password

# Application
NODE_ENV=production
JWT_SECRET=your_32_character_secret
CLIENT_URL=https://your-domain.com
```

---

## 📦 Services Details

### **MongoDB Container**

- **Image**: `mongo:6.0`
- **Port**: `27017`
- **Volumes**: Persistent database storage
- **Security**: Authentication enabled
- **Initialization**: Automatic user and database setup

### **Web Application Container**

- **Build**: Multi-stage (React + Node.js)
- **Port**: `5000`
- **Features**:
  - Health checks
  - File uploads support
  - Production optimized
  - Security hardened

### **Nginx Container (Optional)**

- **Image**: `nginx:alpine`
- **Ports**: `80`, `443`
- **Features**:
  - Reverse proxy
  - SSL termination
  - Static file serving
  - Load balancing ready

---

## 🔧 Management Commands

### **Basic Operations**

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# Restart a service
docker-compose restart webapp

# View logs
docker-compose logs -f webapp
docker-compose logs mongodb

# Check health
docker-compose ps
```

### **Database Operations**

```bash
# Connect to MongoDB
docker-compose exec mongodb mongosh -u admin

# Backup database
docker-compose exec mongodb mongodump --uri="mongodb://admin:password@localhost:27017/fgdc_kohat" --out=/backup

# Restore database
docker-compose exec mongodb mongorestore --uri="mongodb://admin:password@localhost:27017/fgdc_kohat" /backup/fgdc_kohat
```

### **Application Operations**

```bash
# Execute commands in webapp container
docker-compose exec webapp npm run build

# Check application logs
docker-compose exec webapp tail -f logs/combined.log

# Access container shell
docker-compose exec webapp sh
```

---

## 📊 Monitoring & Health Checks

### **Health Check Endpoints**

- **Application**: `http://localhost:5000/api/health`
- **Database**: Automatic MongoDB ping
- **Nginx**: Configuration validation

### **Container Health Status**

```bash
# Check container health
docker-compose ps

# Detailed health information
docker inspect fgdc-webapp | grep -A 10 Health
```

### **Log Monitoring**

```bash
# Real-time logs
docker-compose logs -f

# Application-specific logs
docker-compose logs webapp

# Error logs only
docker-compose logs webapp | grep ERROR
```

---

## 🔐 Security Considerations

### **Container Security**

- ✅ Non-root user in containers
- ✅ Minimal base images (Alpine Linux)
- ✅ No unnecessary packages
- ✅ Read-only file systems where possible

### **Network Security**

- ✅ Internal Docker network isolation
- ✅ Only necessary ports exposed
- ✅ Database not directly accessible
- ✅ CORS properly configured

### **Data Security**

- ✅ Environment variables for secrets
- ✅ Database authentication enabled
- ✅ SSL/TLS ready configuration
- ✅ Secure file upload handling

---

## 🚦 Production Deployment

### **1. Pre-deployment Checklist**

```bash
# Test build locally
docker-compose build

# Run security scan
docker scan fgdc-webapp

# Test all services
docker-compose up -d
curl http://localhost:5000/api/health
```

### **2. Production Environment**

```bash
# Production deployment
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Enable SSL
docker-compose exec nginx certbot --nginx -d your-domain.com
```

### **3. Backup Strategy**

```bash
# Automated backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
docker-compose exec mongodb mongodump --out /backup/db_$DATE
docker-compose exec webapp tar -czf /backup/uploads_$DATE.tar.gz uploads/
```

---

## 🔄 Updates & Maintenance

### **Application Updates**

```bash
# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose build webapp
docker-compose up -d webapp

# Zero-downtime update (with multiple instances)
docker-compose up -d --scale webapp=2
```

### **Database Maintenance**

```bash
# Database backup before updates
docker-compose exec mongodb mongodump --out /backup/pre_update

# Update MongoDB
docker-compose pull mongodb
docker-compose up -d mongodb
```

### **Log Rotation**

```bash
# Clean old logs
docker-compose exec webapp find logs/ -type f -mtime +30 -delete

# Rotate Docker logs
docker system prune -f
```

---

## 🚨 Troubleshooting

### **Common Issues**

#### **Container Won't Start**

```bash
# Check logs
docker-compose logs webapp

# Check resource usage
docker stats

# Verify configuration
docker-compose config
```

#### **Database Connection Issues**

```bash
# Test MongoDB connection
docker-compose exec webapp node -e "
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
console.log('Connected successfully');
"
```

#### **File Upload Issues**

```bash
# Check upload directory permissions
docker-compose exec webapp ls -la uploads/

# Fix permissions if needed
docker-compose exec webapp chown -R nodejs:nodejs uploads/
```

#### **Performance Issues**

```bash
# Monitor resource usage
docker stats

# Check application metrics
curl http://localhost:5000/api/health

# Analyze slow queries (MongoDB)
docker-compose exec mongodb mongosh --eval "db.setProfilingLevel(2)"
```

---

## 📈 Scaling & Performance

### **Horizontal Scaling**

```bash
# Scale web application
docker-compose up -d --scale webapp=3

# Load balancer configuration needed for multiple instances
```

### **Performance Optimization**

```bash
# Enable MongoDB indexes
docker-compose exec mongodb mongosh fgdc_kohat --eval "
db.news.createIndex({createdAt: -1});
db.galleries.createIndex({createdAt: -1});
"

# Optimize Docker images
docker-compose build --no-cache
```

---

## 📞 Support & Maintenance

### **Logs Location**

- **Application**: `./logs/` volume
- **Database**: MongoDB container logs
- **Nginx**: `./nginx_logs/` volume

### **Backup Location**

- **Database**: `/backup/` in MongoDB container
- **Uploads**: `./app_uploads/` volume
- **Configuration**: Version controlled in Git

### **Emergency Procedures**

1. **Quick Rollback**: `docker-compose down && git checkout previous-tag && docker-compose up -d`
2. **Database Recovery**: Restore from latest backup
3. **Emergency Contact**: admin@fgdckohat.edu.pk

---

## 📋 Production Checklist

- [ ] Environment variables configured
- [ ] SSL certificates installed
- [ ] Database backup strategy implemented
- [ ] Monitoring setup completed
- [ ] Log rotation configured
- [ ] Security scanning completed
- [ ] Performance testing done
- [ ] Disaster recovery plan documented

---

**Last Updated**: September 2025  
**Docker Version**: 20.10+  
**Docker Compose Version**: 2.0+
