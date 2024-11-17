FROM node:22-slim AS build
WORKDIR  /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:22-slim AS production
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist
COPY package*.json ./

RUN npm install --only=production



EXPOSE 4000
ENV PORT=4000


CMD ["node", "dist/main.js"]