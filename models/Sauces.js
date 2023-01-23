const mongoose = require('mongoose') // Mongoose is a MongoDB object modeling tool

// we create mongoose model sauceShema
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  manufacturer: { type: String, required: true },
  mainPepper : { type: String, required: true },
  heat : { type: Number, required: true, min: 1, max: 10},
  likes : { type: Number ,default: 0},
  dislikes : { type: Number, default: 0 },
  usersLiked : [String],
  usersDisliked : [String]
})

// we export mongoose model sauceShema
module.exports = mongoose.model('Sauce', sauceSchema)