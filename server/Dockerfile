# Start out with the node v10 slim dockerfile
FROM node:10-slim

# Work in the `/server` directory inside the container
WORKDIR /server

# Copy our local folder (which is `server/` in this repo) into the container.
COPY . /server

# Install the dependencies, and any `postinstall` scripts. Install only
# production files (skipping dev dependencies).
RUN [ "yarn", "install", "--production" ]

# We run on port 4000 by default so we expose that
EXPOSE 4000

# Start the app by running `yarn start`
CMD [ "node", "dist/main.js" ]