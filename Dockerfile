# Use a multi-stage build to reduce the image size
# Stage 1: Build the application
FROM node:latest as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Setup the production environment
FROM node:alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD [ "node", "dist/main"]

# Or you can define environment variables in the Dockerfile directly
ENV PORT=3000

# Adding a health check to your Dockerfile
HEALTHCHECK --interval=30s \
    --timeout=30s \
    CMD node healthcheck.js