# Use the official Node.js image as a base
FROM node:18

# Set working directory for the server
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to install dependencies
COPY server/package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the server code
COPY server/ .

# Set environment variables
ENV MONGODB_URI=mongodb://mongo:27017/BlogApp
ENV PORT=3000

# Expose the port the backend will run on
EXPOSE 3000

# Start the Node.js server
CMD ["npm", "start"]
