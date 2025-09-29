#!/bin/bash

# 📁 Upload Directory Setup Script
# This script creates the necessary upload directories with proper permissions

echo "🚀 Setting up upload directories for F.G. Degree College Kohat website..."

# Define base upload directory
UPLOAD_DIR="./uploads"

# Create directory structure
echo "📁 Creating directory structure..."
mkdir -p "$UPLOAD_DIR/gallery/activities"
mkdir -p "$UPLOAD_DIR/gallery/events"
mkdir -p "$UPLOAD_DIR/gallery/campus"
mkdir -p "$UPLOAD_DIR/news"
mkdir -p "$UPLOAD_DIR/faculty"
mkdir -p "$UPLOAD_DIR/documents/admissions"
mkdir -p "$UPLOAD_DIR/documents/roll-numbers"
mkdir -p "$UPLOAD_DIR/documents/notices"
mkdir -p "$UPLOAD_DIR/logos"

# Create .gitkeep files to ensure directories are tracked in git
echo "📝 Creating .gitkeep files..."
find "$UPLOAD_DIR" -type d -exec touch {}/.gitkeep \;

# Set permissions (Linux/Unix systems)
if [[ "$OSTYPE" == "linux-gnu"* ]] || [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🔐 Setting permissions for Unix-like systems..."
    chmod -R 755 "$UPLOAD_DIR"
    
    # If running as root or with sudo, set proper ownership
    if [[ $EUID -eq 0 ]]; then
        chown -R www-data:www-data "$UPLOAD_DIR" 2>/dev/null || chown -R nginx:nginx "$UPLOAD_DIR" 2>/dev/null || echo "⚠️  Could not set web server ownership"
    fi
fi

# Create README files for each directory
echo "📄 Creating README files for upload directories..."

cat > "$UPLOAD_DIR/README.md" << 'EOF'
# Upload Directory Structure

This directory contains all uploaded files for the F.G. Degree College Kohat website.

## Directory Structure:
- `gallery/` - Photo gallery images
  - `activities/` - College activities photos
  - `events/` - Special events photos
  - `campus/` - Campus photos
- `news/` - News article images
- `faculty/` - Faculty profile photos
- `documents/` - PDF documents and forms
  - `admissions/` - Admission forms and documents
  - `roll-numbers/` - Roll number lists
  - `notices/` - Official notices
- `logos/` - College logos and branding

## File Guidelines:
- Maximum file size: 10MB
- Supported image formats: JPG, JPEG, PNG, WebP
- Supported document formats: PDF
- Use descriptive filenames
- Compress images before uploading for better performance

## Security:
- Directory listings are disabled
- Only authenticated admin users can upload files
- File types are restricted for security
EOF

cat > "$UPLOAD_DIR/gallery/README.md" << 'EOF'
# Gallery Images

Store all gallery images in appropriate subdirectories:
- `activities/` - College activities, sports, cultural events
- `events/` - Special ceremonies, graduations, official events
- `campus/` - Buildings, facilities, campus views

## Image Guidelines:
- Recommended size: 1920x1080 pixels (1080p)
- Format: JPG or WebP for best compression
- Quality: 80-90% for web optimization
- File naming: descriptive names (e.g., "graduation-ceremony-2025.jpg")
EOF

cat > "$UPLOAD_DIR/documents/README.md" << 'EOF'
# Document Storage

Store official documents and forms:
- `admissions/` - Admission forms, prospectus, requirements
- `roll-numbers/` - Class roll number lists
- `notices/` - Official notices and announcements

## Document Guidelines:
- Format: PDF only
- Size: Keep under 5MB when possible
- Naming: Use clear, descriptive names
- Version control: Include dates or version numbers
EOF

# Display success message
echo ""
echo "✅ Upload directory setup completed successfully!"
echo ""
echo "📁 Directory structure created:"
echo "   uploads/"
echo "   ├── gallery/"
echo "   │   ├── activities/"
echo "   │   ├── events/"
echo "   │   └── campus/"
echo "   ├── news/"
echo "   ├── faculty/"
echo "   ├── documents/"
echo "   │   ├── admissions/"
echo "   │   ├── roll-numbers/"
echo "   │   └── notices/"
echo "   └── logos/"
echo ""
echo "🔐 Permissions set to 755"
echo "📄 README files created for guidance"
echo ""
echo "🎯 Next steps:"
echo "   1. Run 'node scripts/createAdmin.js' to create admin user"
echo "   2. Start your application server"
echo "   3. Login to admin panel and start uploading content"
echo ""

# Check if we're in a Git repository and suggest committing
if [ -d ".git" ]; then
    echo "💡 Don't forget to commit these changes:"
    echo "   git add uploads/"
    echo "   git commit -m 'Set up upload directory structure'"
fi