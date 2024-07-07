# Use an official Node.js runtime as the base image
FROM node:21.6

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Copy the .env file into the image
COPY .env ./

# Build the application for production
RUN npm run build

# Expose port 3000 for the application
EXPOSE 3000

# Define the command to run the application
CMD [ "npm", "start" ]