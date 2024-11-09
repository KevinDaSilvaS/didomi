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

## Routes
- GET obtain one user 
- - route ` /users/:email ` 
- POST insert new user 
- - route ` /users/:email ` 
- DELETE remove user 
- - route ` /users/:email `
- POST insert event for one user 
- - route ` /users/:email `
- - body: ` {
	 "id": "sms_notifications",
   "enabled": true
} `

Optionally there´s an insomnia collection if you want to use it called collection
