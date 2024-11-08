# Solution Docs

## Running the app
#### Running on docker
`
    docker compose up
`

#### Running on podman
`
    podman compose up
`

#### Running locally
- Setup .env file based on .env.example file
- Install deps: `npm i`
- Setup db: `npx drizzle-kit push`
- Run the app: `node index.js`

### Running tests
`
    npm run test
`