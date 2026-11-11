FROM node:22-alpine
WORKDIR /app

RUN npm install --location=global mjml
CMD [ "npm", "run", "dev" ]