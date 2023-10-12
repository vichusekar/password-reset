const express = require('express')
const nodemailer = require('nodemailer')
const { UserModel } = require('../model/UserModel')
const mongoose = require('mongoose')
const { dbUrl } = require('../config/dbConfig')
const { hashPassword, comparePassword, createToken } = require('../authentication/auth')
const router = express.Router()

mongoose.connect(dbUrl)

router.post('/sign-up', async (req, res) => {
    try {
        req.body.password = await hashPassword(req.body.password)
        let user = await UserModel.create(req.body)
        user.save()
        res.status(200).send({ message: "Signup Successfully" })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error?.message })
    }
})

router.post('/sign-in', async (req, res) => {
    try {
        let user = await UserModel.findOne({ email: req.body.email })
        if (user) {
            if (await comparePassword(req.body.password, user.password)) {
                let token = await createToken(user)
                res.status(200).send({ message: 'Login Successfully', token })
            }
            else {
                res.status(500).send({ message: "Invalid Credential" })
            }
        }
        else {
            res.status(404).send({ message: `User with ${req.body.email} doesn't exists` })
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error', error: error?.message })
    }
})

router.post('/forgot-password/:id', async (req, res) => {
    try {
        const oldUser = await UserModel.findOne({ email: req.body.email })
        if (oldUser) {
            const passwordLink = `https://capable-bienenstitch-f6d4b0.netlify.app/reset-password/${oldUser._id}`

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'rajasekarvignesh093@gmail.com',
                    pass: 'xacc elgo llit itnq'
                }
            });

            var mailOptions = {
                from: 'vigneshmsho093@gmail.com',
                to: req.body.email,
                subject: 'Reset your password ',
                text: passwordLink,
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.status(200).send({ message: 'Email Sent Successfully' })

        }

        else {
            res.status(400).send({ message: `User with ${req.body.email} doesn't exists`, error: error?.message })
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error', error: error?.message })

    }
})

router.post('/reset-password/:id', async (req, res) => {
    try {
        let user = await UserModel.findOne({ email: req.body.email })
        if (user) {

            user.password = await hashPassword(req.body.password)
            let token = await createToken(user)
            user.save()
            res.status(200).send({ message: 'Password Changed Successfuly', token })

        }
        else {
            res.status(400).send({ message: 'user not exists' })
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error', error: error?.message })
    }
})

module.exports = router
