FROM oven/bun

WORKDIR /app

COPY --from=node:18 /usr/local/bin/node /usr/local/bin/node
COPY package.json .
COPY bun.lockb .
COPY .env.local .

RUN bun install --production

COPY src src
COPY tsconfig.json .


ENV NODE_ENV production

RUN bunx prisma generate
RUN bunx prisma migrate deploy

CMD ["bun", "src/index.ts"]

EXPOSE 3000