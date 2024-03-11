# Fetching the minified node image on apline linux
FROM node:slim

ENV APP_NAME inventory-tracker
# Setting up the work directory
WORKDIR /tmp

# Copying all the files in our project
COPY . /tmp

# Install apache server
RUN apt-get update && apt-get install -y apache2

# Installing angular cli
RUN npm install -g @angular/cli

# Installing dependencies
RUN npm install

# Building the project
RUN ng build --output-path=/var/www/html

# Removing the temporary directory
RUN rm -rf /tmp

# Fetching the minified apache image on apline linux
FROM httpd:2.4

# Copying the build files to the apache server
COPY --from=0 /var/www/html /usr/local/apache2/htdocs/

# Exposing server port
EXPOSE 80
