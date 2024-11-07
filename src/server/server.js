const express = require('express')
const bodyParser = require('body-parser')
const controllers = require('../app/controllers')
const app = express()
app.use(bodyParser.json())

module.exports = (port, config) => {
    app.get('/users/:email', async (req, res) => {
        const { success, error, data } = await controllers.userController.getUser(
            req.params.email, config.userRepository)

        return res.status(success ?? error).send(data)
    })

    app.post('/users/:email', async (req, res) => {
        const { success, error, data } = await controllers.userController.saveUser(
            req.params.email, config.userRepository)

        return res.status(success ?? error).send(data)
    })

    app.delete('/users/:email', async (req, res) => {
        const { success, error, data } = await controllers.userController.deleteUser(
            req.params.email, config.userRepository)

        return res.status(success ?? error).send(data)
    })

    app.post('/events/:email', async (req, res) => {
        const { success, error, data } = await controllers.eventController.saveEvent(
            req.body, req.params.email, config.eventsRepository)

        return res.status(success ?? error).send(data)
    })

    return app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}


