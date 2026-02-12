FROM node:22
RUN addgroup -S animales && useradd -S mateullabres -g animales
USER mateullabres
WORKDIR /app
RUN chown mateullabres:animales /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 3000
CMD ["node","app.js"]