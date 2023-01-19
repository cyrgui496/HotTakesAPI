const express = require("express")
const cors = require('cors')
const path = require('path');
const dotenv = require('dotenv')
const mongoose = require("mongoose")
const userRoutes = require('./routes/user')
const sauceRoutes = require('./routes/sauce')

// Connection of db
dotenv.config()
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.${process.env.DB_NAME}.mongodb.net/?retryWrites=true&w=majority`)
        .then(() => console.log("Connected at MongoDB"))
        .catch((err) => console.log("Not connected at MongoDB", err))

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/auth', userRoutes)
app.use('/api', sauceRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')));

app.listen(3000)