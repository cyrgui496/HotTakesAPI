// inclusion of Sauces model
const Sauce = require('../models/Sauces')

module.exports = (req, res, next) => {
    Sauce.findOne({
            _id: req.params.id
        })
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({
                    message: 'Not authorized'
                })
            } else {
                req.sauce = sauce
                next()
            }
        })
        .catch((error) => {
            res.status(400).json({
                error
            })
        })
}