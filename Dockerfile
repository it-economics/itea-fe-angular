# https://dev.to/rodrigokamada/creating-and-running-an-angular-application-in-a-docker-container-40mk
# > docker build -t itea-fe .
# > docker run -d -p 4201:4200 itea-fe

FROM node:alpine

WORKDIR /app

COPY . /app

RUN npm install -g @angular/cli

RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]

