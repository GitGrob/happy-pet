FROM node:24.11.1

RUN mkdir /frontend
WORKDIR /frontend

COPY . .

RUN npm install

EXPOSE 3000 5173

CMD ["npm", "run", "dev"]
