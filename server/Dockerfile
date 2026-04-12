FROM node:24-alpine

WORKDIR /server-app

COPY package*.json ./

RUN npm ci --production

COPY . .

EXPOSE 7000

CMD ["node","index.js"]