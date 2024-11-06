const express = require('express')
const controllers = require('../app/controllers')
const app = express()

module.exports = (port) => {
    app.get('/users/:email', async (req, res) => {
        const { success, error, data } = await controllers.userController.getUser(
            req.params.email, {
            getFullUserByEmail: () => ({ oi: true }),
        })

        return res.status(success ?? error).send(data)
    })

    app.post('/users/:email', (req, res) => {
        res.send('Hello World!')
    })

    app.delete('/users/:email', (req, res) => {
        res.send('Hello World!')
    })

    app.post('/events/:email', (req, res) => {
        res.send('Hello World!')
    })

    return app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}


