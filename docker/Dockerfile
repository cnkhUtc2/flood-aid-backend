FROM node:18-alpine as development
RUN apk add --no-cache libc6-compat python3 make g++ # <== needed for bcrypt build
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile

FROM node:18-alpine as build
RUN apk add --no-cache libc6-compat python3 make g++
WORKDIR /app
COPY --from=development /app .
RUN yarn build && yarn cache clean

FROM node:18-alpine as production
RUN apk add --no-cache libc6-compat
WORKDIR /app

ENV NODE_ENV production
COPY --from=build /app/dist dist
COPY --from=build /app/node_modules node_modules
COPY --from=build /app/package.json ./
COPY --from=build /app/public public

CMD ["node", "dist/src/main.js"]
