#lastest NodeJs version
FROM node

# latest NPM version
RUN npm install -g npm@latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./


# Install all dependencies (including devDependencies)
RUN npm config set //npm.greensock.com/:_authToken=d8830690-e134-40a5-94e6-b80cf31543a6
RUN npm config set @gsap:registry https://npm.greensock.com
RUN npm install @gsap/shockingly
RUN npm install gsap --registry https://npm.greensock.com
RUN npm config delete //npm.greensock.com/:_authToken
RUN npm config delete @gsap:registry
RUN npm install

# Clear Vite cache
RUN rm -rf node_modules/.vite

# Copy the remaining source code to the container
COPY . .

# Install Babel and necessary plugins/presets
RUN npm install @babel/core @babel/cli @babel/preset-env --save-dev

# Build the backend using Babel
RUN npm run build:be


# Build the React frontend
RUN npm run build

# Expose the port your app runs on (adjust as needed)
EXPOSE 3000

# Set environment variables
ENV NODE_ENV production

# Run the application (assuming npm run dev starts your app)
CMD ["npm", "run", "dev"]
