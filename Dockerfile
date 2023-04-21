FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/libera-front

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./

RUN apk add --no-cache bash
# RUN npm install
RUN npm install --legacy-peer-deps

# Bundle app source
COPY . .

EXPOSE 3000

RUN npm run build
CMD ["npm", "run", "start"]
