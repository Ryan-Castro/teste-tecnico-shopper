FROM node:18-alpine AS bulder


WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080