# Frontend Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files first for better Docker layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy TypeScript configuration files
COPY tsconfig*.json ./
COPY vite.config.ts ./

# Copy source code and public files
COPY src ./src/
COPY public ./public/
COPY index.html ./
COPY env.d.ts ./

# Expose Vite dev server port
EXPOSE 5173

# Run Vite dev server with host binding for Docker
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]