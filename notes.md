# Docker, Node, Mango

## Start a Node.js Project `app`

```bash
npm init

npm install body-parser    # parse whatever comes in from our form
npm install ejs            # template engine
npm install express        # frame work
npm install mongoose       # talk to mango
```

- Modify [`package.json`](package.json):

```json
"scripts": {
    "start": "node index.js"
}
```

- Make `models`:

```bash
mkdir models
touch models/Items.js
vim models/Items.js    # models/Items.js
```

- New [`index.js`](index.js)

- Make `views`:

```bash
mkdir views
touch views/index.ejs
vim views/index.ejs   # views/index.ejs
```

- Test and Debug in `localhost`:

```bash
sudo docker container run -d -p 27017:27017 --name my_mongo mongo

node index.js

# localhost:3000
```

- New [`Dockerfile`](Dockerfile)

```note
FROM node:11              # node version 11

WORKDIR /usr/scr/app      # working directory in the container

COPY package*.json ./     # copy package.js and package-lock.js to working directory

RUN npm install           # npm install

COPY . .                  # copy other files, edit the .dockerignore prevent node_modules push to your docker hub

EXPOSE 3000               # container port exposed to local machine

CMD ["npm", "start"]      # package.js: {scripts: {start: "..."}}
```

- New [`docker-compose.yml`](docker-compose.yml)

```yml
version: '3'                                      # version of `docker-compose`
services:
    app:                                          # app container
        container_name: docker-node-mongo
        restart: always                           # restart whenever it fails
        build: .                                  # will use the `Dockerfile` in the same dir to build container
        ports:
            - '80:3000'                           # local machine to app container
        links:
            - mongo                               # app container to mongo container
    mongo:
        container_name: mongo
        image: mongo
        ports: '27017:27017'                      # local machine to mango container
```

- New [`.dockerignore`](.dockerignore)

- Modify `localhost` to `mongo` container in `index.js`, and remove the test mongo container.

- Try docker-compose in local machine:

```bash
# remove `node_modules`

# install docker-compose at the first time https://docs.docker.com/compose/install/
docker-compose --version

# ./
sudo docker-compose up
# Ctl + C to exit
# if want it run background
sudo docker-compose up -d

# check in localhost:80

# to remove containers and network
sudo docker-compose down
```

- Push this dir to github

- Deploy to Server:

    - Open a VPS
    - [Install docker](https://hub.docker.com/search?q=&type=edition&offering=community&sort=updated_at&order=desc)
    - [Install docker-composer](https://docs.docker.com/compose/install/)
    - pull repo
    - run `docker-compose up`
    - checke http://domain.name
