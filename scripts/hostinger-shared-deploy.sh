#!/bin/bash

# 🚀 Hostinger Shared Hosting Quick Deploy Script
# This script prepares your project for Hostinger shared hosting deployment

echo "🏫 FGDC Bkohat - Hostinger Shared Hosting Deployment"
echo "=================================================="

# Check if we're in the right directory
if [ ! -f "package.json" ] && [ ! -f "client/package.json" ]; then
    echo "❌ Error: Run this script from the project root directory"
    exit 1
fi

# Create deployment directory
echo "📁 Creating deployment directory..."
mkdir -p deployment/shared-hosting
cd deployment/shared-hosting

# Build the frontend
echo "🔨 Building frontend for production..."
cd ../../client

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

# Build for production
echo "🏗️ Building frontend..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Frontend build successful!"
    
    # Copy build files to deployment directory
    echo "📋 Copying build files..."
    cp -r dist/* ../deployment/shared-hosting/
    
    # Create .htaccess for React Router
    cat > ../deployment/shared-hosting/.htaccess << 'EOF'
# React Router - Handle client-side routing
RewriteEngine On
RewriteBase /

# Handle Angular and other client-side routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
    AddOutputFilterByType DEFLATE application/json
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/ico "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header always set X-Frame-Options DENY
    Header always set X-Content-Type-Options nosniff
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
EOF

    echo "✅ .htaccess file created for React Router support"
    
    # Create a simple index for file listing (helpful for verification)
    cd ../deployment/shared-hosting
    echo "📄 Files ready for upload to Hostinger:"
    echo "======================================"
    find . -type f -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.png" -o -name "*.jpg" -o -name "*.svg" -o -name ".htaccess" | head -20
    echo ""
    
    # Count total files
    total_files=$(find . -type f | wc -l)
    echo "📊 Total files: $total_files"
    
    # Get directory size
    dir_size=$(du -sh . | cut -f1)
    echo "💾 Total size: $dir_size"
    
    echo ""
    echo "🎉 SUCCESS! Your website is ready for Hostinger shared hosting!"
    echo ""
    echo "📤 Next Steps:"
    echo "1. Zip the contents of './deployment/shared-hosting/' folder"
    echo "2. Log into Hostinger control panel"
    echo "3. Go to File Manager"
    echo "4. Navigate to public_html/fgdcbkohat.edu.pk/ (or public_html if main domain)"
    echo "5. Upload and extract the zip file"
    echo "6. Set up your API on Railway/Render using the backend code"
    echo ""
    echo "📋 Don't forget to:"
    echo "- Configure DNS in Hostinger (A record for domain, CNAME for API)"
    echo "- Deploy backend to Railway and update VITE_API_URL"
    echo "- Test the website thoroughly"
    echo ""
    echo "🌐 Your website will be live at: https://fgdcbkohat.edu.pk"
    
else
    echo "❌ Frontend build failed! Check for errors above."
    exit 1
fi