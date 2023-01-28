const bcrypt = require('bcrypt') // A library to hash passwords
// To secure our routes we use the JSON Web Token (JWT) which is a standard method for the exchange of secure data
const jwt = require('jsonwebtoken')

// inclusion of Users model
const User = require('../models/Users')

// we make possible the creation of account
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      })
      user.save()
        .then(() => res.status(201).json({
          message: 'Utilisateur créé !'
        }))
        .catch(error => res.status(400).json({
          error
        }))
    })
    .catch(error => res.status(500).json({
      error
    }))
}

// we make possible the connexion on an account
exports.login = (req, res, next) => {
  User.findOne({
      email: req.body.email
    })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'Paire login/mot de passe incorrecte'
        })
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({
              message: 'Paire login/mot de passe incorrecte'
            })
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({
                userId: user._id
              },
              process.env.TOKEN_SECRET, {
                expiresIn: '24h'
              }
            )
          })
        })
        .catch(error => res.status(500).json({
          error
        }))
    })
    .catch(error => res.status(500).json({
      error
    }))
}