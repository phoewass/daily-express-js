#!/bin/bash

#Provisionning
wget -qO- https://deb.nodesource.com/setup_6.x | sudo bash - # This command includes apt-get update
sudo apt-get -y install jq nodejs git g++# Nodejs 6.x includes npm
sudo npm install nodemon gulp -g

#Build
cd /vagrant
npm install --no-bin-links

#Run
nodemon bin/www