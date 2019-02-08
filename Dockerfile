FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json conn.js ./

RUN npm install

COPY . .

COPY --chown=node:node . .

USER node

EXPOSE 7000

CMD [ "node", "server.js" ]