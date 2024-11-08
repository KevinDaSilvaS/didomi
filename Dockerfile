FROM node:alpine

EXPOSE 3000

COPY ./ .

RUN npm i

RUN npx drizzle-kit push

CMD node index.js