FROM node:20-alpine

WORKDIR /app

COPY package.json tsconfig.base.json ./
COPY packages/api/package.json packages/api/package.json
COPY packages/frontend/package.json packages/frontend/package.json
COPY packages/db/package.json packages/db/package.json

RUN corepack enable && yarn install --non-interactive

COPY . .

RUN yarn workspace @campaign/api build

EXPOSE 4000

CMD ["yarn", "workspace", "@campaign/api", "start"]
