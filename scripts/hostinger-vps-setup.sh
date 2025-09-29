#!/bin/bash

# Federal Government Degree College Kohat - VPS Setup Script for Hostinger
# Run this on your Hostinger VPS

echo "🚀 Starting F.G Degree College for Boys Kohat Website Setup on Hostinger VPS..."

# Update system
echo "📦 Updating system packages..."
apt update && apt upgrade -y

# Install Node.js 18
echo "🔧 Installing Node.js 18..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Install PM2
echo "⚡ Installing PM2 Process Manager..."
npm install -g pm2

# Install Nginx
echo "🌐 Installing Nginx..."
apt install nginx -y

# Install Git
echo "📚 Installing Git..."
apt install git -y

# Install SSL tools
echo "🔒 Installing SSL tools..."
apt install certbot python3-certbot-nginx -y

# Create application directory
echo "📁 Creating application directory..."
mkdir -p /var/www/fgdcbkohat
mkdir -p /var/www/html/fgdcbkohat

# Set permissions
chown -R www-data:www-data /var/www/html/fgdcbkohat
chmod -R 755 /var/www/html/fgdcbkohat

echo "✅ Basic setup complete!"
echo ""
echo "🔧 Next steps:"
echo "1. Clone your repository to /var/www/fgdcbkohat"
echo "2. Setup .env file in server directory"
echo "3. Run: cd /var/www/fgdcbkohat/server && npm install"
echo "4. Run: pm2 start server.js --name 'college-api'"
echo "5. Build frontend: cd ../client && npm install && npm run build"
echo "6. Copy build: cp -r dist/* /var/www/html/fgdcbkohat/"
echo "7. Configure Nginx and SSL"
echo ""
echo "📖 Full guide available in DEPLOYMENT-GUIDE.md"