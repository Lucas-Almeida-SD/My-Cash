FROM node:16.15.1-alpine

WORKDIR /back-end

COPY . .

RUN npm install

EXPOSE 3001

CMD npm run db:reset && npm start