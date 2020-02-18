FROM node:12.2.0-alpine

WORKDIR /workdir

COPY schema.sdl /workdir/schema.sdl
RUN npm install -g graphql-faker

CMD ["graphql-faker", "/workdir/schema.sdl"]