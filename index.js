const express = require("express")
const cors = require('cors')
const path = require('path');
const mongoose = require("mongoose")
const userRoutes = require('./routes/user')
const sauceRoutes = require('./routes/sauce')

// Connection of db
const username = "cyrgui496";
const password = "6HvrMOdeBPdmJxdN"
const cluster = "cluster0.b3yw5in"
const dbname = "b3yw5in"
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.${dbname}.mongodb.net/?retryWrites=true&w=majority`)
        .then(() => console.log("Connected at MongoDB"))
        .catch((err) => console.log("Not connected at MongoDB", err))

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/auth', userRoutes)
app.use('/api', sauceRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')));

app.listen(3000)