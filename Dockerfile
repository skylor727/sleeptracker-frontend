# Stage 1: Install dependencies and build the app
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package.json and package-lock.json or yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Copy prisma schema and migrations
COPY prisma ./prisma

# Generate Prisma Client
RUN npx prisma generate

# Build the Next.js application
RUN yarn build

# Stage 2: Serve the built app
FROM node:18-alpine
WORKDIR /app

# Copy the built app from the builder stage
COPY --from=builder /app ./

EXPOSE 3000

CMD ["yarn", "start"]
