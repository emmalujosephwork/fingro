# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project into the container
COPY . .

# Expose the application port
EXPOSE 3000

# Define environment variables
ENV PORT=3000
ENV MONGO_URI=mongodb://mongo:27017/fingrodb

# Start the application
CMD ["node", "app.js"]
