FROM node:18.8.0-alpine3.16 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . /app/
ENV NODE_OPTIONS=--max-old-space-size=8096
RUN npm run build

FROM nginx:1.22.1-alpine as prod-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]