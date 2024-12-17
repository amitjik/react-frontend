


FROM registry.access.redhat.com/ubi8/nodejs-16@sha256:859ad7def6dc1d40987cb9ab9795c266316b6a7b62710f2898fe3fa8fcfd0bc4

#FROM registry.access.redhat.com/ubi8/nodejs-18
COPY package.json ./
RUN npm install --production

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

FROM registry.access.redhat.com/ubi8/nodejs-16-minimal:latest
COPY --from=0 /opt/app-root/src/node_modules /opt/app-root/src/node_modules
COPY . /opt/app-root/src

#ENV BACKEND_URI=${BACKEND_URI}
ENV NODE_ENV production
ENV PORT 3000
EXPOSE 3000
CMD ["npm", "start"]
