# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm ci

# Bundle app source
COPY . .

# Set environment variables
ENV SECRET_KEY f2b3628d0a1ec51b691cf159b98f134bb8cf9747cf49a3d284c2190e266f35ef

# Expose the app's port
EXPOSE 8000

# Define the command to run your app
CMD ["npm", "start"]