FROM debian:latest

RUN apt-get update && apt-get install -y curl

RUN apt-get install -y npm

WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN npm install -g @angular/cli

RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]
