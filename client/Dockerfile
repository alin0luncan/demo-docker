# base image
FROM node:alpine

# set working directory
RUN mkdir /app
WORKDIR /app
COPY . .


# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install --silent
RUN npm install yarn -g --silent
RUN npm install react-scripts -g --silent

RUN yarn
EXPOSE 3000
# start app
CMD ["npm", "start"]
