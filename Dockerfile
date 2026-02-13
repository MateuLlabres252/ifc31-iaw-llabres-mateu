FROM node:22-alpine
RUN addgroup -S animales && adduser -S mateullabres -G animales
USER mateullabres
WORKDIR /app
RUN chown mateullabres:animales /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 3000
CMD ["node","app.js"]