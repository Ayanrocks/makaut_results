FROM node:10.12.0

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .


CMD [ "npm","start" ]