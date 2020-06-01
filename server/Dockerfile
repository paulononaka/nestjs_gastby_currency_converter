FROM node:12.17.0

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

COPY .env.mongo.docker .env.mongo

CMD ["yarn", "start"]

EXPOSE 3000
