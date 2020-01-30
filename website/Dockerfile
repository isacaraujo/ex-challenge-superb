FROM node:13.7.0-stretch-slim

ENV DEBIAN_FRONTEND noninteractive
ENV HOME /home/node
ENV TZ=UTC

RUN mkdir -p /var/www \
    && mkdir -p /opt/pm2/pid

RUN chown -R node: /var/www \
    && chown -R node: /usr/local \
    && chown -R node: /home/node \
    && chown -R node: /opt/pm2/pid

RUN cd /home/node && \
    echo 'export PATH=$HOME/local/bin:$PATH' >> ~/.bashrc

RUN apt update \
    && apt install -y tzdata git

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY . /var/www/

RUN chown -R node:node /var/www

USER node

ENV NPM_CONFIG_LOGLEVEL info
ENV TYPESCRIPT_VERSION 3.7.5

RUN yarn global add typescript@$TYPESCRIPT_VERSION

WORKDIR /var/www/

CMD [ "npm", "start" ]
