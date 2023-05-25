FROM node:19-alpine as builder
WORKDIR /usr/bot
COPY src src
COPY package.json package-lock.json config.swcrc .env ./
RUN npm i -g @swc/cli @swc/core
RUN npm i && npm run build

FROM node:19-alpine
WORKDIR /usr/bot
COPY --from=builder /usr/bot/dist /usr/bot/dist
COPY --from=builder /usr/bot/package.json ./
COPY --from=builder /usr/bot/package-lock.json ./
COPY --from=builder /usr/bot/.env ./
RUN npm i
CMD ["node", "dist/index.js"]