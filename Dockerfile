FROM node


#setup working directory
WORKDIR /app

#copy code into the container
COPY . /app

EXPOSE 8000

ENV SEGMENT_SIZE = 150
ENV PORT=8000

#install all the dependencies
RUN npm install

#compine the code
RUN npm run compile

#start the application
CMD ["node", "destination/index.js"]