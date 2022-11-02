FROM node:alpine

COPY . /home/node/app

WORKDIR /home/node/app

RUN npm ci

EXPOSE 3000
CMD ["nodejs", "index.mjs"]
