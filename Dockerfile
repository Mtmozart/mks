FROM node:latest

WORKDIR /src

COPY . .
COPY ./.env ./env

RUN npm install --quiet --no-optional --no-fund --loglevel=error

#RUN npm run build
EXPOSE 9229

CMD ["npm", "run", "start:dev"]