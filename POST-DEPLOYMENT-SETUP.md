# 🚀 Post-Deployment Setup Guide - F.G. Degree College Kohat

## 📋 Overview

This guide covers essential setup tasks after successfully deploying your college website to production.

---

## 👤 **1. Creating Admin User**

### **Method 1: Using the Admin Creation Script (Recommended)**

#### **On Traditional VPS/Server:**

```bash
# Navigate to your project directory
cd /var/www/fgdc-kohat-website/server

# Run the admin creation script
node scripts/createAdmin.js
```

#### **Using Docker:**

```bash
# Execute the script inside the webapp container
docker-compose exec webapp node scripts/createAdmin.js

# Alternative: Direct container execution
docker exec -it fgdc-webapp node scripts/createAdmin.js
```

#### **Expected Output:**

```
Connected to MongoDB
Admin user created successfully
Username: admin
Password: admin123
Email: admin@fgckohat.edu.pk
```

### **Method 2: Manual Database Creation**

#### **Connect to MongoDB:**

```bash
# Traditional setup
mongosh "mongodb://localhost:27017/fgdc_kohat"

# Docker setup
docker-compose exec mongodb mongosh -u admin -p your_password fgdc_kohat
```

#### **Create Admin User Manually:**

```javascript
// In MongoDB shell
db.users.insertOne({
  username: "admin",
  email: "admin@fgdckohat.edu.pk",
  password: "$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // "password"
  fullName: "System Administrator",
  role: "super-admin",
  permissions: {
    canManageNews: true,
    canManageGallery: true,
    canManageFaculty: true,
    canManageAdmissions: true,
    canManagePages: true,
    canManageContacts: true,
    canManageUsers: true,
  },
  createdAt: new Date(),
  isActive: true,
});
```

### **⚠️ IMPORTANT: Change Default Password**

1. **Log into admin panel**: `https://your-domain.com/admin`
2. **Use credentials**: `admin` / `admin123`
3. **Immediately change password** to a strong one
4. **Update email** to your actual admin email

---

## 📁 **2. File Storage & Photo Management**

### **Upload Directory Structure**

```
server/uploads/
├── gallery/          # Photo gallery images
│   ├── activities/   # College activities photos
│   ├── events/       # Special events photos
│   └── campus/       # Campus photos
├── news/             # News article images
├── faculty/          # Faculty profile photos
├── documents/        # PDF documents, forms
│   ├── admissions/   # Admission forms
│   ├── roll-numbers/ # Roll number lists
│   └── notices/      # Official notices
└── logos/            # College logos and branding
```

### **File Permissions Setup**

#### **Traditional VPS/Server:**

```bash
# Set proper ownership
sudo chown -R www-data:www-data /var/www/fgdc-kohat-website/server/uploads/

# Set proper permissions
sudo chmod -R 755 /var/www/fgdc-kohat-website/server/uploads/

# Make directories writable by web server
sudo chmod -R 775 /var/www/fgdc-kohat-website/server/uploads/
```

#### **Docker Setup:**

```bash
# Create upload directories with proper permissions
docker-compose exec webapp mkdir -p uploads/{gallery,news,faculty,documents,logos}
docker-compose exec webapp chown -R nodejs:nodejs uploads/
docker-compose exec webapp chmod -R 755 uploads/
```

### **File Upload Limits & Restrictions**

#### **Current Configuration:**

- **Max file size**: 10MB per file
- **Allowed image types**: JPG, JPEG, PNG, WebP
- **Allowed document types**: PDF
- **Gallery images**: Automatically resized for web optimization

#### **Storage Locations by Feature:**

| Feature            | Upload Path                        | File Types     | Max Size |
| ------------------ | ---------------------------------- | -------------- | -------- |
| **Gallery Photos** | `/uploads/gallery/`                | JPG, PNG, WebP | 10MB     |
| **News Images**    | `/uploads/news/`                   | JPG, PNG, WebP | 5MB      |
| **Faculty Photos** | `/uploads/faculty/`                | JPG, PNG       | 2MB      |
| **Documents**      | `/uploads/documents/`              | PDF            | 10MB     |
| **Roll Numbers**   | `/uploads/documents/roll-numbers/` | PDF            | 5MB      |

---

## 🔐 **3. Security Setup After Deployment**

### **Change Default Credentials**

```bash
# Admin panel password (via web interface)
# Database passwords (if using defaults)
# JWT secret (in environment variables)
```

### **SSL Certificate Setup**

```bash
# Using Certbot (Let's Encrypt)
sudo certbot --nginx -d fgdckohat.edu.pk

# Verify SSL
curl -I https://fgdckohat.edu.pk
```

### **Firewall Configuration**

```bash
# Ubuntu/Debian
sudo ufw allow 22/tcp      # SSH
sudo ufw allow 80/tcp      # HTTP
sudo ufw allow 443/tcp     # HTTPS
sudo ufw enable

# Block direct database access
sudo ufw deny 27017/tcp
```

---

## 📊 **4. Monitoring & Maintenance**

### **Log Monitoring**

```bash
# PM2 logs
pm2 logs fgdc-kohat-website

# Docker logs
docker-compose logs -f webapp

# System logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### **Health Checks**

```bash
# Application health
curl https://your-domain.com/api/health

# Database connection
curl https://your-domain.com/api/news | jq '.'
```

### **Backup Setup**

```bash
# Create backup script
cat > /home/deploy/backup.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p /home/deploy/backups

# Database backup
mongodump --uri="mongodb://localhost:27017/fgdc_kohat" --out /home/deploy/backups/db_$DATE

# Files backup
tar -czf /home/deploy/backups/uploads_$DATE.tar.gz -C /var/www/fgdc-kohat-website/server uploads/

# Keep only last 30 days
find /home/deploy/backups -type f -mtime +30 -delete
EOF

chmod +x /home/deploy/backup.sh

# Schedule daily backups
echo "0 2 * * * /home/deploy/backup.sh" | crontab -
```

---

## 🎯 **5. Initial Content Setup**

### **Upload College Logo**

1. **Go to**: `https://your-domain.com/admin/gallery`
2. **Upload logo** to gallery with title "College Logo"
3. **Logo will automatically appear** in header/footer

### **Add Initial Content**

#### **News & Announcements**

1. **Admin Panel**: `/admin/news`
2. **Add**: Admission announcements, exam schedules
3. **Include**: High-quality images and proper dates

#### **Faculty Information**

1. **Admin Panel**: `/admin/faculty`
2. **Add**: Faculty profiles with photos
3. **Include**: Qualifications, subjects, contact info

#### **Gallery Photos**

1. **Admin Panel**: `/admin/gallery`
2. **Categories**: Campus, Events, Activities, Achievements
3. **Optimize**: Images before uploading (use compression tools)

#### **Static Pages Content**

1. **Admin Panel**: `/admin/pages`
2. **Update**: About, Admission Policy, Examination info
3. **Verify**: All college-specific information

---

## 📱 **6. Testing After Deployment**

### **Functionality Testing Checklist**

- [ ] **Admin login** works with new credentials
- [ ] **File upload** works for all types (images, PDFs)
- [ ] **Gallery management** - add, edit, delete photos
- [ ] **News management** - create, update, publish news
- [ ] **Contact form** sends emails properly
- [ ] **Roll number downloads** work correctly
- [ ] **Mobile responsiveness** across all pages
- [ ] **Page loading speed** is acceptable (< 3 seconds)

### **Security Testing**

- [ ] **HTTPS** enforced on all pages
- [ ] **Admin panel** requires authentication
- [ ] **File upload restrictions** working
- [ ] **SQL injection protection** tested
- [ ] **XSS protection** verified

---

## 🚨 **7. Common Post-Deployment Issues**

### **File Upload Not Working**

```bash
# Check permissions
ls -la /var/www/fgdc-kohat-website/server/uploads/

# Fix permissions
sudo chown -R www-data:www-data uploads/
sudo chmod -R 775 uploads/
```

### **Images Not Displaying**

```bash
# Check if files exist
ls -la uploads/gallery/

# Verify web server configuration
curl https://your-domain.com/uploads/gallery/sample.jpg
```

### **Admin Panel Access Issues**

```bash
# Check admin user exists
mongosh fgdc_kohat --eval "db.users.findOne({role: 'super-admin'})"

# Reset admin password if needed
node scripts/createAdmin.js
```

### **Database Connection Issues**

```bash
# Test connection
node -e "
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);
console.log('Connected!');
"
```

---

## 📞 **8. Support & Maintenance Contacts**

### **Technical Support**

- **System Admin**: admin@fgdckohat.edu.pk
- **Database Issues**: Call 0333-6040021
- **Web Issues**: tech@fgdckohat.edu.pk

### **Regular Maintenance Tasks**

- **Weekly**: Check logs for errors
- **Monthly**: Update content, check backups
- **Quarterly**: Security updates, password changes
- **Annually**: SSL certificate renewal, full system backup

---

## 📋 **Quick Start Commands**

```bash
# Create admin user
node scripts/createAdmin.js

# Check application status
curl https://your-domain.com/api/health

# View logs
pm2 logs fgdc-kohat-website

# Restart application
pm2 restart fgdc-kohat-website

# Database backup
mongodump --uri="mongodb://localhost:27017/fgdc_kohat" --out ./backup
```

---

**🎉 Your F.G. Degree College Kohat website is now ready for production use!**

**Remember**: Always test new content in a staging environment before adding to production, and maintain regular backups of both database and uploaded files.

---

**Last Updated**: September 2025  
**Version**: 1.0.0
