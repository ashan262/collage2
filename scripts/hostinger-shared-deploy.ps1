# 🚀 Hostinger Shared Hosting Quick Deploy Script (PowerShell)
# This script prepares your project for Hostinger shared hosting deployment

Write-Host "🏫 FGDC Bkohat - Hostinger Shared Hosting Deployment" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

# Check if we're in the right directory
if (-not (Test-Path "client\package.json")) {
    Write-Host "❌ Error: Run this script from the project root directory" -ForegroundColor Red
    exit 1
}

# Create deployment directory
Write-Host "📁 Creating deployment directory..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path "deployment\shared-hosting" | Out-Null
Set-Location "client"

# Check if dependencies are installed
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Yellow
    npm install
}

# Build for production
Write-Host "🏗️ Building frontend..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Frontend build successful!" -ForegroundColor Green
    
    # Copy build files to deployment directory
    Write-Host "📋 Copying build files..." -ForegroundColor Yellow
    Copy-Item -Path "dist\*" -Destination "..\deployment\shared-hosting\" -Recurse -Force
    
    # Create .htaccess for React Router
    Set-Location "..\deployment\shared-hosting"
    
    $htaccessContent = @"
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
"@

    $htaccessContent | Out-File -FilePath ".htaccess" -Encoding UTF8
    Write-Host "✅ .htaccess file created for React Router support" -ForegroundColor Green
    
    # Display file information
    Write-Host "📄 Files ready for upload to Hostinger:" -ForegroundColor Cyan
    Write-Host "======================================" -ForegroundColor Cyan
    
    $files = Get-ChildItem -File -Recurse | Where-Object { $_.Extension -match '\.(html|js|css|png|jpg|svg)$' -or $_.Name -eq '.htaccess' } | Select-Object -First 20
    $files | ForEach-Object { Write-Host "  $($_.FullName.Replace($PWD.Path, '.'))" }
    
    if ((Get-ChildItem -File -Recurse).Count -gt 20) {
        Write-Host "  ... and more files" -ForegroundColor Gray
    }
    
    Write-Host ""
    
    # Count total files and get size
    $totalFiles = (Get-ChildItem -File -Recurse).Count
    $totalSize = [math]::Round((Get-ChildItem -File -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB, 2)
    
    Write-Host "📊 Total files: $totalFiles" -ForegroundColor Cyan
    Write-Host "💾 Total size: $totalSize MB" -ForegroundColor Cyan
    
    Write-Host ""
    Write-Host "🎉 SUCCESS! Your website is ready for Hostinger shared hosting!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📤 Next Steps:" -ForegroundColor Yellow
    Write-Host "1. Compress the contents of '.\deployment\shared-hosting\' folder to a ZIP file" -ForegroundColor White
    Write-Host "2. Log into your Hostinger control panel (https://hpanel.hostinger.com/)" -ForegroundColor White
    Write-Host "3. Go to 'File Manager'" -ForegroundColor White
    Write-Host "4. Navigate to 'public_html/fgdcbkohat.edu.pk/' (or 'public_html' if main domain)" -ForegroundColor White
    Write-Host "5. Upload and extract the ZIP file" -ForegroundColor White
    Write-Host "6. Deploy your backend to Railway (https://railway.app) or Render (https://render.com)" -ForegroundColor White
    Write-Host ""
    Write-Host "📋 Don't forget to:" -ForegroundColor Yellow
    Write-Host "- Configure DNS in Hostinger control panel" -ForegroundColor White
    Write-Host "- Update your backend API URL in production build" -ForegroundColor White
    Write-Host "- Test all functionality after deployment" -ForegroundColor White
    Write-Host ""
    Write-Host "🌐 Your website will be live at: https://fgdcbkohat.edu.pk" -ForegroundColor Green
    
    # Return to original directory
    Set-Location "..\.."
    
} else {
    Write-Host "❌ Frontend build failed! Check for errors above." -ForegroundColor Red
    Set-Location ".."
    exit 1
}