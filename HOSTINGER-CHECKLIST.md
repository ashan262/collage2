# 📋 Hostinger Deployment Checklist

## Pre-Deployment Setup

- [ ] Domain `fgdcbkohat.edu.pk` added to Hostinger account
- [ ] MongoDB Atlas cluster created and configured
- [ ] Cloudinary account setup with API keys
- [ ] GitHub repository ready and pushed

## Choose Your Deployment Method

### Option A: Hostinger VPS (Full Stack)

- [ ] VPS plan active on Hostinger
- [ ] SSH access configured
- [ ] Domain pointed to VPS IP address

**VPS Deployment Steps:**

- [ ] Connect to VPS via SSH
- [ ] Run setup script: `curl -fsSL https://raw.githubusercontent.com/your-repo/main/scripts/hostinger-vps-setup.sh | bash`
- [ ] Clone repository to `/var/www/fgdcbkohat`
- [ ] Create server `.env` file with production values
- [ ] Install dependencies: `cd server && npm install --production`
- [ ] Start with PM2: `pm2 start server.js --name college-api`
- [ ] Build frontend: `cd ../client && npm install && npm run build`
- [ ] Copy to web directory: `cp -r dist/* /var/www/html/fgdcbkohat/`
- [ ] Configure Nginx for domain and API routing
- [ ] Setup SSL with Let's Encrypt: `certbot --nginx -d fgdcbkohat.edu.pk -d www.fgdcbkohat.edu.pk -d api.fgdcbkohat.edu.pk`

### Option B: Hostinger Shared Hosting + External API

- [ ] Shared hosting plan active
- [ ] Railway/Render account for API hosting
- [ ] Domain configured in Hostinger control panel

**Shared Hosting Deployment Steps:**

- [ ] Deploy backend to Railway: `railway deploy`
- [ ] Set all environment variables in Railway dashboard
- [ ] Update client `.env.production` with Railway API URL
- [ ] Build frontend locally: `cd client && npm run build`
- [ ] Upload `dist/*` files to Hostinger via File Manager or FTP
- [ ] Configure DNS in Hostinger to point API subdomain to Railway

## Environment Variables Checklist

### Backend (VPS or Railway):

- [ ] `NODE_ENV=production`
- [ ] `MONGO_URI=mongodb+srv://...` (from Atlas)
- [ ] `CLOUDINARY_CLOUD_NAME=your_cloud_name`
- [ ] `CLOUDINARY_API_KEY=your_api_key`
- [ ] `CLOUDINARY_API_SECRET=your_api_secret`
- [ ] `JWT_SECRET=your_very_long_secure_secret`
- [ ] `CLIENT_URL=https://fgdcbkohat.edu.pk`

### Frontend (Build Environment):

- [ ] `VITE_API_URL=https://api.fgdcbkohat.edu.pk` (VPS) or `https://your-app.railway.app` (Shared)

## DNS Configuration in Hostinger

### For VPS:

- [ ] A record: `@` → VPS IP address
- [ ] CNAME record: `www` → `fgdcbkohat.edu.pk`
- [ ] A record: `api` → VPS IP address (or CNAME if using subdomain)

### For Shared + External API:

- [ ] A record: `@` → Hostinger shared hosting IP
- [ ] CNAME record: `www` → `fgdcbkohat.edu.pk`
- [ ] CNAME record: `api` → `your-app.railway.app`

## Testing Checklist

### Backend API Tests:

- [ ] `https://api.fgdcbkohat.edu.pk/api/health` returns 200 OK
- [ ] Admin login functionality works
- [ ] Image upload to Cloudinary works
- [ ] Database operations work (create, read, update, delete)

### Frontend Tests:

- [ ] `https://fgdcbkohat.edu.pk` loads correctly
- [ ] All navigation works
- [ ] Images load from Cloudinary
- [ ] Contact forms submit successfully
- [ ] Admin panel accessible
- [ ] Responsive design works on mobile

### SSL and Security:

- [ ] HTTPS enforced (no HTTP access)
- [ ] No mixed content warnings
- [ ] SSL certificate valid for all domains
- [ ] CORS configured correctly
- [ ] Rate limiting working

## Post-Deployment Maintenance

### Regular Tasks:

- [ ] Monitor server logs for errors
- [ ] Check SSL certificate expiry (auto-renewal setup)
- [ ] Monitor database and Cloudinary usage
- [ ] Update dependencies monthly
- [ ] Backup database weekly

### Hostinger-Specific:

- [ ] Monitor VPS resource usage (if using VPS)
- [ ] Check Hostinger control panel for any notices
- [ ] Verify DNS propagation globally
- [ ] Monitor website uptime

## 🆘 Emergency Contacts

- **Hostinger Support**: Available 24/7 via live chat
- **MongoDB Atlas**: Support tickets via Atlas dashboard
- **Cloudinary**: Support via Cloudinary dashboard

## 📞 College Contact Information

- **Email**: fgdcbkohat@gmail.com
- **Phone**: 0333-6040021
- **Facebook**: https://www.facebook.com/share/16NHH6K1Np/
