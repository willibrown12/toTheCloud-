FROM node:20-slim

WORKDIR /usr/app/

COPY public public 
COPY index.js . 
COPY package.json .
COPY package-lock.json .

RUN npm install

EXPOSE 4201
CMD ["npm" , "start"]