FROM node:16.15.1-alpine

WORKDIR /front-end

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]