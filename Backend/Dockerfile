FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["sh", "-c", "printenv && node createDB.js && node index.js"]