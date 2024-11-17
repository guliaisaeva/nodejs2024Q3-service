FROM node:22-slim AS base
WORKDIR  /usr/src/app
COPY package*.json ./

RUN npm install --force
COPY ..

EXPOSE 4000

CMD ["node", "dist/main.js"]