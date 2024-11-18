# FROM node:22-alpine
# WORKDIR /usr/app
# COPY package*.json .
# COPY prisma ./prisma
# RUN npm ci --legacy-peer-deps && npm cache clean --force
# RUN npx prisma generate
# EXPOSE 4000
# COPY . .
# CMD ["npm", "run", "start:dev"]


FROM node:22-alpine AS build

WORKDIR /usr/app

COPY package*.json ./
RUN npm ci --legacy-peer-deps && npm cache clean --force

COPY . .

RUN npm run build

FROM node:22-alpine

WORKDIR /usr/app

COPY --from=build /usr/app/dist ./dist
COPY --from=build /usr/app/package*.json ./

RUN npm ci --production --legacy-peer-deps && npm cache clean --force

EXPOSE 4000

CMD ["npm", "run", "start:prod"]
