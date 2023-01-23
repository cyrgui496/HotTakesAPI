const express = require("express") // standard framework for server development in Node.js
const cors = require('cors') // CORS is a node.js package that can be used to enable CORS
const path = require('path') // The Path module provides a way of working with directories and file paths
const dotenv = require('dotenv') // Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
const mongoose = require("mongoose") // Mongoose is a MongoDB object modeling tool
// inclusion of routes
const userRoutes = require('./routes/user')
const sauceRoutes = require('./routes/sauce')

// Connection of db
dotenv.config()
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.${process.env.DB_NAME}.mongodb.net/?retryWrites=true&w=majority`)
        .then(() => console.log("Connected at MongoDB"))
        .catch((err) => console.log("Not connected at MongoDB", err))

const app = express() // We create the express app

// use middleware
app.use(express.json()) // The express.json() function is a built-in middleware function in Express. It parses incoming requests with JSON payloads.
app.use(cors())
// use routes
app.use('/api/auth', userRoutes)
app.use('/api', sauceRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')));

// We run the app on port 3000
app.listen(3000)