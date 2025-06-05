# Backend Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files first for better Docker layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy Prisma schema and generate client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy TypeScript configuration
COPY tsconfig.json ./

# Copy source code
COPY src ./src/

# Build TypeScript to JavaScript
RUN npm run build

# Expose the port your backend uses
EXPOSE 3000

# For development: Use nodemon with TypeScript
# For production: Use the built JavaScript
CMD ["npm", "run", "dev"]