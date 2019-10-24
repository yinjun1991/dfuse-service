FROM node:12.13.0-buster

RUN npm install -g pm2

WORKDIR /app

ADD package.json .

ADD dist .

ADD ecosystem.config.js .

RUN npm install

CMD ["$(which pm2)", "start"]
