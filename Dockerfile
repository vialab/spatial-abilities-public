FROM node

RUN apt update
RUN apt install -y nginx

# RUN apt install npm
RUN npm install --global gulp-cli

# Build front end
COPY frontend /usr/src/frontend
WORKDIR /usr/src/frontend
RUN npm install
RUN gulp

# Copy in back end
WORKDIR /usr/src
COPY backend /usr/src/backend
WORKDIR /usr/src/backend
RUN mkdir /usr/src/backend/submit-dump
RUN npm install

RUN rm /etc/nginx/sites-enabled/default

# Move front end to web root
RUN cp -r /usr/src/frontend/build/. /var/www/html/
# Copy ngnix config
COPY nginx.conf /etc/nginx/nginx.conf

# Forward request and error logs to Docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
  && ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 80

COPY startup.sh /usr/src

CMD ["/bin/bash", "/usr/src/startup.sh"]
