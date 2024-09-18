# Use an official Node runtime as the base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy build folder
COPY build ./build

# Install a simple server to serve static content
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["serve", "-s", "build", "-l", "3000"]