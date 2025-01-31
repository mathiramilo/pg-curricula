FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache python3 py3-pip

RUN ln -sf python3 /usr/bin/python

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

EXPOSE 3000

RUN pnpm venv:setup:unix

CMD ["pnpm", "dev"]