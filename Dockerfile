# Base Image Download
FROM 317367993082.dkr.ecr.ap-southeast-2.amazonaws.com/node-base-lite-aws:10.19.0
MAINTAINER AreMedia arm.builduser@gmail.com

ENV APP_KEY=homes-site

## Should set the environment variable when running the container, the default is to run in stubbed mode.
## ENV NODE_ENV=stubbed

COPY ./src /app
WORKDIR /app
EXPOSE 3001

CMD ["npm", "start"]
