const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (error) {
        res.status(400).send(e)
    }
})

router.get('/users/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
    const bodyKeys = Object.keys(req.body)
    const allowedFields = ['name', 'email', 'age', 'password']
    const isValidOperation = bodyKeys.every((key) => allowedFields.includes(key))

    if (!isValidOperation) {
        return res.status(400).send({'error': 'Invalid body request'})
    }

    try {
        bodyKeys.forEach((key) => req.user[key] = req.body[key])
        await req.user.save()
        res.send(req.user)
    } catch (error) {
        res.status(400).send()
    }
})

router.delete('/users/me', auth, async (req, res) => {

    try {
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        console.error(error)
        res.status(500).send()
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter( (t) => {
             return t.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (error) {
        res.status(500).send()
    }
})


router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router