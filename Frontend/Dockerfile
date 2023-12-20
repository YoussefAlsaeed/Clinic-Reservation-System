FROM node:18-alpine

WORKDIR /app

RUN npm install -g @angular/cli@16
COPY package*.json ./
RUN npm ci
COPY . .

COPY ./replace-port.sh ./replace-port.sh
RUN chmod +x ./replace-port.sh

COPY ./replace-config.sh ./replace-config.sh
RUN chmod +x ./replace-config.sh

RUN chmod -R 777 /app

# EXPOSE 4200
CMD ["/bin/sh", "-c", "./replace-port.sh && ./replace-config.sh && ng serve --host 0.0.0.0 --disableHostCheck true"]
