FROM mhart/alpine-node:latest
MAINTAINER leo.wei leo.wei.badger@gmail.com
ENV EGG_SERVER_ENV=prod
RUN npm install --production
EXPOSE 7001

CMD ["npm", "start"]