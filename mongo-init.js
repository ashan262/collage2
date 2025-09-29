// MongoDB initialization script for Docker
// This script creates the application database and user

// Switch to the application database
db = db.getSiblingDB("fgdc_kohat");

// Create application user with read/write permissions
db.createUser({
  user: "webapp_user",
  pwd: process.env.WEBAPP_DB_PASSWORD || "webapp_password_change_me",
  roles: [
    {
      role: "readWrite",
      db: "fgdc_kohat",
    },
  ],
});

// Create collections with basic structure
db.createCollection("users");
db.createCollection("news");
db.createCollection("pages");
db.createCollection("galleries");
db.createCollection("contacts");

// Insert default admin user (password should be changed after deployment)
db.users.insertOne({
  username: "admin",
  email: "admin@fgdckohat.edu.pk",
  password: "$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
  role: "admin",
  createdAt: new Date(),
  isActive: true,
});

// Create indexes for better performance
db.news.createIndex({ createdAt: -1 });
db.news.createIndex({ title: "text", content: "text" });
db.galleries.createIndex({ createdAt: -1 });
db.contacts.createIndex({ createdAt: -1 });
db.pages.createIndex({ slug: 1 }, { unique: true });

console.log("Database initialization completed successfully");
