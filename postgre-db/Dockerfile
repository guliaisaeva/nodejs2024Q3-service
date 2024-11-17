FROM node:22-slim AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:22-slim AS production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist

COPY package*.json ./

RUN npm install --only=production

EXPOSE 4000

ENV PORT=4000
ENV DB_HOST=postgres
ENV DB_PORT=5432
ENV DB_USER=library_admin
ENV DB_PASSWORD=supersecretpassword
ENV DB_NAME=library_db

CMD ["node", "dist/main.js"]
