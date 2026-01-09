FROM node:24.11.1

WORKDIR /app

COPY package*.json ./
RUN npm install

# Only copy the server files needed for dev:server script
COPY server/db.json ./db.json

EXPOSE 3001

CMD ["npm", "run", "dev:server"]
