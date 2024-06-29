# Base image
FROM node:20

# Create app directory
WORKDIR /usr/src/app


# Bundle app source
COPY . .

# Install app dependencies
RUN npm install

# Build the app
RUN npm run build


# Expose the port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
