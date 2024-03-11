# Description: Dockerfile for the production environment of the front-end application.

## Stage 1: Build the application
# Fetching the minified node image on apline linux
FROM node:slim as base

ENV APP_NAME inventory-tracker
# Setting up the work directory
WORKDIR /tmp

# Copying all the files in our project
COPY . /tmp

# Installing angular cli
RUN npm install -g @angular/cli

# Installing dependencies
RUN npm install


## Stage 2: Running tests
# Using the base image
FROM base as test

# Install firefox
RUN apt-get update && apt-get install -y firefox-esr

# Install tests required packages
RUN npm install -g karma && npm install karma-firefox-launcher --save-dev

# Running tests
RUN ng test --browsers=FirefoxHeadless --watch=false


## Stage 3: building the application
FROM base as build

# Building the project
RUN ng build --output-path=/var/www/html

# Removing the temporary directory
RUN rm -rf /tmp


## Stage 4: Running the application
# Fetching the minified apache image on apline linux
FROM httpd:2.4

# Copying the build files to the apache server
COPY --from=build /var/www/html /usr/local/apache2/htdocs/

# Exposing server port
EXPOSE 80
