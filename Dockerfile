FROM mhart/alpine-node:latest
MAINTAINER leo.wei leo.wei.badger@gmail.com
ENV EGG_SERVER_ENV=prod
# WORKDIR /app
ADD . /app
RUN npm install --production
EXPOSE 7001

CMD ["npm", "start", "> stdout.log 2> stderr.log"]
#CMD ["node", "index.js"]