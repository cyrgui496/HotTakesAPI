const express = require("express")
var cors = require('cors')
const mongoose = require("mongoose")
const userRoutes = require('./routes/user');

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
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors())

app.use('/api/auth', userRoutes)

/*
app.post('/api/auth/signup', (req, res) => {
    res.json(req.body)
})
*/
app.listen(3000)