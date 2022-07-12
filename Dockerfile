FROM node:14.17.5-alpine3.14 as builder
RUN mkdir -p /first-i12-web-frontend
WORKDIR /first-i12-web-frontend
COPY . .
RUN yarn install
ARG BUILD_ENV
RUN yarn ${BUILD_ENV}

FROM node:14.17.5-alpine3.14
RUN mkdir -p /second-i12-web-frontend
WORKDIR /second-i12-web-frontend
COPY --from=builder /first-i12-web-frontend/node_modules node_modules
COPY --from=builder /first-i12-web-frontend/.next .next
COPY package.json package.json
COPY next.config.js next.config.js
COPY public public

CMD ["yarn", "start"]

