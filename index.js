const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT

const userRouter = require('./routes/router')
const indexRouter = require('./routes/index')

const { dbUrl } = require('./config/dbConfig')

app.use('/', userRouter)
app.use('/user', indexRouter)

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => console.log(`App running in port ${PORT}`))