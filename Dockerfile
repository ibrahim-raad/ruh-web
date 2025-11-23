# Stage 1: Builder
FROM node:lts-alpine AS builder

# Update system dependencies to fix vulnerabilities
RUN apk update && apk upgrade --no-cache

WORKDIR /app

# Copy package files for efficient caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build the application
RUN npm run build

# Stage 2: Production
FROM nginx:alpine

# Copy built artifacts from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration template
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Expose port 80
EXPOSE 80

# Start Nginx
# The default entrypoint for the nginx image will process the template 
# using environment variables before starting nginx
CMD ["nginx", "-g", "daemon off;"]

