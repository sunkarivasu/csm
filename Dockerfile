FROM node:18.13.0
WORKDIR /app
COPY . /app/
RUN npm run build
EXPOSE 3333
CMD [ "npm", "start" ]