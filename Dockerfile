# F.G. Degree College Kohat Website - Docker Configuration

# ===============================
# Multi-stage Dockerfile
# ===============================
# Stage 1: Build React app
FROM node:18-alpine AS client-build

# Set working directory for client build
WORKDIR /app/client

# Copy client package files
COPY client/package*.json ./

# Install client dependencies
RUN npm ci --only=production

# Copy client source code
COPY client/ ./

# Build the React app
RUN npm run build

# ===============================
# Stage 2: Setup Node.js server
FROM node:18-alpine AS server

# Create app directory
WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Copy server package files
COPY server/package*.json ./

# Install server dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy server source code
COPY server/ ./

# Copy built client files from previous stage
COPY --from=client-build /app/client/dist ./public

# Create uploads directory with proper permissions
RUN mkdir -p uploads/gallery && \
    chown -R nodejs:nodejs uploads && \
    chmod -R 755 uploads

# Create logs directory
RUN mkdir -p logs && \
    chown -R nodejs:nodejs logs && \
    chmod -R 755 logs

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Start the application
CMD ["npm", "start"]