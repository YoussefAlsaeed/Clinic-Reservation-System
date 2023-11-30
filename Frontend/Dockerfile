FROM node:18-alpine

WORKDIR /app

RUN npm install -g @angular/cli@16
COPY package*.json ./
RUN npm ci
COPY . .

EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0"]