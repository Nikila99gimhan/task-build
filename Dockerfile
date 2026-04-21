FROM node:20-alpine

WORKDIR /app

# Copy package files first (better layer caching)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy app code
COPY src ./src

# Run as non-root user (node user UID 1000 ships with node:alpine)
USER node

EXPOSE 3000

CMD ["node", "src/index.js"]
