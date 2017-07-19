#!/bin/bash
curl https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
source ~/.nvm/nvm.sh
nvm install "6.1.0"
nvm use "6.1.0"
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
sudo sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
sudo apt-get update
sudo apt-get install google-chrome-stable
apt-get install xvfb
google-chrome --product-version
