FROM node:16.3.0-alpine
WORKDIR /app
ADD . /app
RUN cd server
RUN npm install
RUN npm run build
EXPOSE 5000
CMD npm start