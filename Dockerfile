FROM node:lts-alpine AS base

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN pnpm run build

FROM node:lts-alpine AS final
WORKDIR /app
COPY --from=base /app/.output .

EXPOSE 3000

ENV NITRO_PORT=3000
CMD ["node", "server/index.mjs"]
