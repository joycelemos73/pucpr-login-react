# React application Dockerfile

# Use Node.js as the base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Expose port 3000 (React's default development server port)
EXPOSE 3000

# Start the React development server
CMD ["npm", "start"]
