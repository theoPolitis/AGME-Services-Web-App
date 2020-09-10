# pull official base image
FROM node:12.18.3

# set working directory
WORKDIR ./src

# add `/app/node_modules/.bin` to $PATH
ENV PATH ./node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app ------this needs to be fixed idk the path
COPY ./app./

# start app
CMD ["npm", "start"]