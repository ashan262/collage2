@echo off
REM 📁 Upload Directory Setup Script for Windows
REM This script creates the necessary upload directories

echo 🚀 Setting up upload directories for F.G. Degree College Kohat website...

REM Define base upload directory
set UPLOAD_DIR=uploads

REM Create directory structure
echo 📁 Creating directory structure...
mkdir "%UPLOAD_DIR%\gallery\activities" 2>nul
mkdir "%UPLOAD_DIR%\gallery\events" 2>nul
mkdir "%UPLOAD_DIR%\gallery\campus" 2>nul
mkdir "%UPLOAD_DIR%\news" 2>nul
mkdir "%UPLOAD_DIR%\faculty" 2>nul
mkdir "%UPLOAD_DIR%\documents\admissions" 2>nul
mkdir "%UPLOAD_DIR%\documents\roll-numbers" 2>nul
mkdir "%UPLOAD_DIR%\documents\notices" 2>nul
mkdir "%UPLOAD_DIR%\logos" 2>nul

REM Create .gitkeep files
echo 📝 Creating .gitkeep files...
echo. > "%UPLOAD_DIR%\gallery\activities\.gitkeep"
echo. > "%UPLOAD_DIR%\gallery\events\.gitkeep"
echo. > "%UPLOAD_DIR%\gallery\campus\.gitkeep"
echo. > "%UPLOAD_DIR%\news\.gitkeep"
echo. > "%UPLOAD_DIR%\faculty\.gitkeep"
echo. > "%UPLOAD_DIR%\documents\admissions\.gitkeep"
echo. > "%UPLOAD_DIR%\documents\roll-numbers\.gitkeep"
echo. > "%UPLOAD_DIR%\documents\notices\.gitkeep"
echo. > "%UPLOAD_DIR%\logos\.gitkeep"

REM Create README files
echo 📄 Creating README files...

echo # Upload Directory Structure > "%UPLOAD_DIR%\README.md"
echo. >> "%UPLOAD_DIR%\README.md"
echo This directory contains all uploaded files for the F.G. Degree College Kohat website. >> "%UPLOAD_DIR%\README.md"
echo. >> "%UPLOAD_DIR%\README.md"
echo ## Directory Structure: >> "%UPLOAD_DIR%\README.md"
echo - `gallery/` - Photo gallery images >> "%UPLOAD_DIR%\README.md"
echo   - `activities/` - College activities photos >> "%UPLOAD_DIR%\README.md"
echo   - `events/` - Special events photos >> "%UPLOAD_DIR%\README.md"
echo   - `campus/` - Campus photos >> "%UPLOAD_DIR%\README.md"
echo - `news/` - News article images >> "%UPLOAD_DIR%\README.md"
echo - `faculty/` - Faculty profile photos >> "%UPLOAD_DIR%\README.md"
echo - `documents/` - PDF documents and forms >> "%UPLOAD_DIR%\README.md"
echo - `logos/` - College logos and branding >> "%UPLOAD_DIR%\README.md"

echo.
echo ✅ Upload directory setup completed successfully!
echo.
echo 📁 Directory structure created:
echo    uploads/
echo    ├── gallery/
echo    │   ├── activities/
echo    │   ├── events/
echo    │   └── campus/
echo    ├── news/
echo    ├── faculty/
echo    ├── documents/
echo    │   ├── admissions/
echo    │   ├── roll-numbers/
echo    │   └── notices/
echo    └── logos/
echo.
echo 🎯 Next steps:
echo    1. Run 'node scripts/createAdmin.js' to create admin user
echo    2. Start your application server
echo    3. Login to admin panel and start uploading content
echo.
pause