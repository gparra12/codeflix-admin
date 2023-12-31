FROM node:14.15.4-slim

RUN echo "deb http://archive.debian.org/debian stretch main" > /etc/apt/sources.list

RUN apt update && apt install -y --no-install-recommends \ 
    git

USER node

WORKDIR /home/node/app

CMD [ "sh", "-c", "npm install && tail -f /dev/null" ]