FROM node:14-alpine

WORKDIR /app

ENTRYPOINT npm install && npm run dev