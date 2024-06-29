# Base image
FROM node:20

# Create app directory
WORKDIR /usr/src/app


# Bundle app source
COPY . .

# Install app dependencies
RUN npm install


# Expose the port
EXPOSE 8080

# Start the app
CMD ["node", "src/index.js"]
