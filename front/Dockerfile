# Fetching the minified node image on apline linux
FROM node:slim

ENV APP_NAME inventory-tracker
# Setting up the work directory
WORKDIR /tmp

# Copying all the files in our project
COPY . /tmp

# Installing angular cli
RUN npm install -g @angular/cli

# Installing dependencies
RUN npm install

# Building the project
RUN ng build

# Move the build to the web server directory
RUN mv /tmp/dist/${APP_NAME} /usr/src/app

# Removing the temporary directory
RUN rm -rf /tmp

# Setting up the work directory
WORKDIR /usr/src/app

# Starting the web server
CMD ["npm", "start"]

# Exposing server port
EXPOSE 4200
