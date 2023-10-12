const express = require('express')
const { UserModel } = require('../model/UserModel')
const router = express.Router()

router.get('/reset-password/:id', async (req, res) => {
    try {
        let user = await UserModel.findById(req.params.id)
        if (user) {
            let data = await UserModel.findOne({ _id: req.params.id })
            res.status(200).send({ message: 'Data Fetched Successfully', data })
        }
        else {
            res.status(500).send({ message: 'Inavlid User' })
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error', error: error?.message })
    }
})

module.exports = router