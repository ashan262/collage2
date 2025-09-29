# Federal Government Degree College Kohat - Deployment Guide (Hostinger)

## Project Overview

- **Domain**: fgdcbkohat.edu.pk
- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas
- **Image Storage**: Cloudinary
- **Hosting**: Hostinger
- **Backend URL**: https://api.fgdcbkohat.edu.pk
- **Frontend URL**: https://fgdcbkohat.edu.pk

## 🚀 Hostinger Deployment Options

### Option 1: Hostinger VPS (Recommended for Node.js)

### Option 2: Hostinger Shared Hosting + External API (Railway/Render)

## 🔧 OPTION 1: Hostinger VPS Deployment (Full Control)

### Prerequisites

- [ ] Hostinger VPS plan
- [ ] Domain pointed to Hostinger nameservers
- [ ] MongoDB Atlas cluster created
- [ ] Cloudinary account configured
- [ ] SSH access to VPS

### 1. VPS Setup

#### Connect to VPS:

```bash
ssh root@your-vps-ip
```

#### Install Node.js, PM2, and Nginx:

```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Install PM2 (Process Manager)
npm install -g pm2

# Install Nginx
apt install nginx -y

# Install Git
apt install git -y
```

#### Setup SSL with Let's Encrypt:

```bash
apt install certbot python3-certbot-nginx -y
```

### 2. Deploy Backend

#### Clone and Setup:

```bash
# Create app directory
mkdir -p /var/www/fgdcbkohat
cd /var/www/fgdcbkohat

# Clone repository
git clone https://github.com/your-username/your-repo.git .

# Install server dependencies
cd server
npm install --production

# Create .env file
nano .env
```

#### Server .env Configuration:

```bash
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/collegewebsite?retryWrites=true&w=majority
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_very_long_secure_jwt_secret
CLIENT_URL=https://fgdcbkohat.edu.pk
COLLEGE_NAME=Federal Government Degree College For Boys Kohat Cantt
COLLEGE_EMAIL=fgdcbkohat@gmail.com
COLLEGE_PHONE=0333-6040021
```

#### Start Backend with PM2:

```bash
# Start the application
pm2 start server.js --name "college-api"

# Save PM2 configuration
pm2 save

# Setup PM2 startup
pm2 startup
```

### 3. Deploy Frontend

#### Build and Setup:

```bash
# Go to client directory
cd /var/www/fgdcbkohat/client

# Create .env.production
nano .env.production
```

#### Client .env.production:

```bash
VITE_API_URL=https://api.fgdcbkohat.edu.pk
VITE_APP_NAME=Federal Government Degree College For Boys Kohat Cantt
VITE_COLLEGE_NAME=Federal Government Degree College For Boys Kohat Cantt
VITE_COLLEGE_EMAIL=fgdcbkohat@gmail.com
VITE_COLLEGE_PHONE=0333-6040021
```

#### Build Frontend:

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Copy build files to web directory
cp -r dist/* /var/www/html/fgdcbkohat/
```

### 4. Nginx Configuration

#### Main Site Config:

```bash
nano /etc/nginx/sites-available/fgdcbkohat.edu.pk
```

```nginx
server {
    listen 80;
    server_name fgdcbkohat.edu.pk www.fgdcbkohat.edu.pk;
    root /var/www/html/fgdcbkohat;
    index index.html;

    # Frontend (React)
    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "public, max-age=31536000";
    }

    # Static assets
    location /assets {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}

# API subdomain
server {
    listen 80;
    server_name api.fgdcbkohat.edu.pk;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### Enable Site and SSL:

```bash
# Enable site
ln -s /etc/nginx/sites-available/fgdcbkohat.edu.pk /etc/nginx/sites-enabled/

# Test nginx config
nginx -t

# Restart nginx
systemctl restart nginx

# Get SSL certificates
certbot --nginx -d fgdcbkohat.edu.pk -d www.fgdcbkohat.edu.pk -d api.fgdcbkohat.edu.pk
```

## 🔧 OPTION 2: Hostinger Shared Hosting + External API

### Prerequisites

- [ ] Hostinger shared hosting plan
- [ ] Domain added to Hostinger
- [ ] Railway/Render account for API
- [ ] MongoDB Atlas cluster created
- [ ] Cloudinary account configured

### 1. Deploy Backend to Railway (External)

#### Railway Setup:

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway add
```

#### Environment Variables (Railway):

```bash
NODE_ENV=production
PORT=$PORT
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/collegewebsite?retryWrites=true&w=majority
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_very_long_secure_jwt_secret
CLIENT_URL=https://fgdcbkohat.edu.pk
```

### 2. Deploy Frontend to Hostinger

#### Build Locally:

```bash
# Update client .env.production
VITE_API_URL=https://your-app.railway.app

# Build the project
cd client
npm run build
```

#### Upload to Hostinger:

1. **Via File Manager**:

   - Login to Hostinger Control Panel
   - Open File Manager
   - Navigate to `public_html/fgdcbkohat.edu.pk/`
   - Upload all files from `client/dist/`

2. **Via FTP/SFTP**:

```bash
# Using FileZilla or WinSCP
Host: fgdcbkohat.edu.pk
Username: your_hostinger_username
Password: your_hostinger_password
Port: 21 (FTP) or 22 (SFTP)
```

### 3. Hostinger DNS Configuration

#### In Hostinger Control Panel:

```
Type    Name    Value                           TTL
A       @       [Hostinger IP]                  14400
CNAME   www     fgdcbkohat.edu.pk              14400
CNAME   api     your-app.railway.app           14400
```

## 🎯 Recommended Approach for Your Setup

### If you have Hostinger VPS:

✅ **Use Option 1** - Full control, better performance, single hosting provider

### If you have Hostinger Shared Hosting:

✅ **Use Option 2** - Frontend on Hostinger, API on Railway (free tier available)

## 📋 Quick Setup Commands

### For Hostinger VPS (Complete setup):

```bash
# 1. Connect to VPS
ssh root@your-vps-ip

# 2. Run setup script
curl -fsSL https://raw.githubusercontent.com/your-username/your-repo/main/scripts/vps-setup.sh | bash

# 3. Configure domain in Hostinger control panel
# 4. Point domain to VPS IP
# 5. Run SSL setup
```

### For Hostinger Shared + Railway:

```bash
# 1. Deploy API to Railway
railway login
railway init --name college-api
railway connect

# 2. Build frontend locally
cd client
npm run build

# 3. Upload dist/* to Hostinger via File Manager
```

## 💡 Hostinger-Specific Tips

### VPS Performance Optimization:

```bash
# Install Redis for caching (optional)
apt install redis-server -y

# Setup log rotation
nano /etc/logrotate.d/college-app

# Monitor resources
htop
pm2 monit
```

### Shared Hosting Limitations:

- ❌ No Node.js support on shared hosting
- ✅ Perfect for React build files (static)
- ✅ Good performance with CDN
- ✅ Easy file management interface

### Hostinger DNS Management:

1. Login to Hostinger Control Panel
2. Go to "DNS Zone Editor"
3. Add required records
4. Wait 24-48 hours for propagation

## 🔄 Auto-Deployment Setup

### For VPS (with GitHub Actions):

```yaml
# .github/workflows/deploy.yml
name: Deploy to Hostinger VPS
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to VPS
        uses: appleboy/ssh-action@v0.1.5
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USERNAME }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /var/www/fgdcbkohat
            git pull origin main
            cd server && npm install --production
            cd ../client && npm install && npm run build
            cp -r dist/* /var/www/html/fgdcbkohat/
            pm2 restart college-api
```

## 📝 Post-Deployment Checklist

### Backend Verification:

- [ ] `https://api.fgdcbkohat.edu.pk/api/health` returns 200
- [ ] Admin login works
- [ ] Image upload to Cloudinary works
- [ ] Database connections are stable
- [ ] All API endpoints respond correctly

### Frontend Verification:

- [ ] `https://fgdcbkohat.edu.pk` loads correctly
- [ ] All pages navigate properly
- [ ] Images load from Cloudinary
- [ ] Contact forms submit successfully
- [ ] Admin panel accessible and functional

### SSL & Security:

- [ ] HTTPS enforced on both domains
- [ ] No mixed content warnings
- [ ] CORS configured correctly
- [ ] Rate limiting working
- [ ] Environment variables secure

## 🛠 Troubleshooting

### Common Issues:

#### Backend Issues:

- **500 errors**: Check environment variables and MongoDB connection
- **CORS errors**: Verify `CLIENT_URL` environment variable
- **Image upload fails**: Check Cloudinary credentials
- **Database connection fails**: Verify MongoDB Atlas IP whitelist

#### Frontend Issues:

- **API calls fail**: Check `VITE_API_URL` environment variable
- **Images don't load**: Verify Cloudinary URLs and image utility functions
- **Build fails**: Check Node.js version and dependencies

### Useful Commands:

```bash
# Test API locally
curl https://api.fgdcbkohat.edu.pk/api/health

# Check DNS propagation
nslookup fgdcbkohat.edu.pk
nslookup api.fgdcbkohat.edu.pk

# Test image loading
curl -I https://res.cloudinary.com/your-cloud/image/upload/sample.jpg
```

## 📱 Contact Information

- **College Email**: fgdcbkohat@gmail.com
- **College Phone**: 0333-6040021
- **Facebook**: https://www.facebook.com/share/16NHH6K1Np/

## 🔄 Maintenance

### Regular Tasks:

- Monitor server logs for errors
- Check database storage usage
- Verify Cloudinary storage limits
- Update dependencies regularly
- Backup database periodically

### Scaling Considerations:

- Render paid plans for better performance
- Vercel Pro for higher bandwidth
- MongoDB Atlas cluster upgrades if needed
- Cloudinary paid plans for more storage
