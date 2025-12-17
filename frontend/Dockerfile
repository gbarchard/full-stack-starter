FROM node:25.2.1-alpine

WORKDIR /app

COPY package.json .
RUN npm install 

COPY . .

CMD ["npm", "run", "dev"]