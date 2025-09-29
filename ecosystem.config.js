module.exports = {
  apps: [
    {
      name: "fgdc-kohat-website",
      script: "./server/server.js",
      cwd: "/var/www/fgdc-kohat-website",
      instances: "max",
      exec_mode: "cluster",
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
        PORT: 5000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 5000,
      },
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_file: "./logs/combined.log",
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm Z",
      merge_logs: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: "60s",
      restart_delay: 4000,
      kill_timeout: 1600,
      wait_ready: true,
      listen_timeout: 8000,
    },
  ],

  deploy: {
    production: {
      user: "deploy",
      host: "your-server-ip",
      ref: "origin/main",
      repo: "git@github.com:yourusername/fgdc-kohat-website.git",
      path: "/var/www/fgdc-kohat-website",
      "pre-deploy-local": "",
      "post-deploy":
        "npm install && npm run build && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
    },
  },
};
