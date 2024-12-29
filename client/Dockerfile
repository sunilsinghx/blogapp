# Step 1: Build React app
FROM node:18 AS build

# Set working directory for the client
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY client/package*.json ./

# Install dependencies for the frontend
RUN npm install

# Copy the rest of the client code
COPY client/ .

# Build the React app for production
RUN npm run build

# Step 2: Serve React app using a lightweight web server
FROM nginx:alpine

# Copy the React build folder to Nginx public directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the React app
EXPOSE 80

# Start Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]
