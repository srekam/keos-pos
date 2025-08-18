# Multi-stage build for React frontend
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies with better caching
RUN npm ci --only=production --prefer-offline --no-audit

# Copy source code (exclude unnecessary files)
COPY . .

# Build the app with optimized settings
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built app from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Set default port
ENV PORT=40001

# Expose port (will be overridden by docker-compose)
EXPOSE ${PORT}

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
