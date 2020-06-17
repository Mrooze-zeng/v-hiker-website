FROM node:alpine
WORKDIR /server

COPY /server/package.json .

COPY /server .

EXPOSE 4000