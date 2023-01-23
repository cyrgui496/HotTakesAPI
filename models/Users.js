const mongoose = require('mongoose') // Mongoose is a MongoDB object modeling tool
const uniqueValidator = require('mongoose-unique-validator') // mongoose-unique-validator is a plugin which adds pre-save validation for unique fields within a Mongoose schema

// we create mongoose model userShema
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

// we active uniqueValidator
userSchema.plugin(uniqueValidator)

// we export mongoose model userShema
module.exports = mongoose.model('User', userSchema)