FROM node:latest

WORKDIR /mn_pita

COPY package.json /mn_pita
RUN npm install

ENV NODE_ENV dev
ENV PORT 8000

COPY . /mn_pita

EXPOSE 8000
CMD ["npm", "run", "dev"]