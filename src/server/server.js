const express = require('express')
const controllers = require('../app/controllers')
const app = express()

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
        res.send('Hello World!')
    })

    return app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}


