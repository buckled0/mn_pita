FROM node:latest

WORKDIR /

COPY package.json /
RUN npm install

ENV NODE_ENV dev
ENV PORT 8000

COPY . /

EXPOSE 8000
CMD ["npm", "run", "dev"]