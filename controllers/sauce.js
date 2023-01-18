const Sauce = require('../models/Sauces')
const fs = require('fs')

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce)
    delete sauceObject._id
    delete sauceObject._userId
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0
    })
    console.log(sauce)
    sauce.save()
        .then(() => {
            res.status(201).json({
                message: 'Sauce enregistré !'
            })
        })
        .catch(error => {
            res.status(400).json({
                error
            })
        })
}

exports.getAllSauces = (req, res, next) => {
    Sauce.find().then(
        (sauces) => {
            res.status(200).json(sauces)
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            })
        }
    )
}

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id
    }).then(
        (sauce) => {
            res.status(200).json(sauce)
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            })
        }
    )
}

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
        ...req.body
    };

    delete sauceObject._userId;
    Sauce.findOne({
            _id: req.params.id
        })
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({
                    message: 'Not authorized'
                })
            } else {
                Sauce.updateOne({
                        _id: req.params.id
                    }, {
                        ...sauceObject,
                        _id: req.params.id
                    })
                    .then(() => res.status(200).json({
                        message: 'Sauce modifié!'
                    }))
                    .catch(error => res.status(401).json({
                        error
                    }))
            }
        })
        .catch((error) => {
            res.status(400).json({
                error
            })
        })
}

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({
            _id: req.params.id
        })
        .then(sauce => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({
                    message: 'Not authorized'
                })
            } else {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({
                            _id: req.params.id
                        })
                        .then(() => {
                            res.status(200).json({
                                message: 'Sauce supprimé !'
                            })
                        })
                        .catch(error => res.status(401).json({
                            error
                        }))
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                error
            })
        })
}

exports.likeSauce = (req, res, next) => {
    Sauce.findOne({
            _id: req.params.id
        })
        .then((sauce) => {
                function managementOfLikeAndDislike(){
                    const like = req.body.like
                    if(like == 1) {
                        sauce.likes += 1
                        sauce.usersLiked.push(req.auth.userId)
                        
                    }
                    else if(like == -1) {
                        sauce.dislikes += 1
                        sauce.usersDisliked.push(req.auth.userId)
                    }
                    else {
                        console.log("test")
                        if(sauce.usersLiked.includes(req.auth.userId)){
                            sauce.likes -= 1
                            const indexOfUsersLiked = sauce.usersLiked.indexOf(req.auth.userId);
                            if (indexOfUsersLiked !== -1) {
                                sauce.usersLiked.splice(indexOfUsersLiked, 1);
                            }
                        }
                        if(sauce.usersDisliked.includes(req.auth.userId)){
                            sauce.dislikes -= 1
                            const indexOfUsersDisliked = sauce.usersDisliked.indexOf(req.auth.userId);
                            if (indexOfUsersDisliked !== -1) {
                                sauce.usersDisliked.splice(indexOfUsersDisliked, 1);
                            }
                        }
                    }
                }
                managementOfLikeAndDislike()
                console.log(sauce)
                Sauce.updateOne({
                        _id: req.params.id
                    }, {
                        likes : sauce.likes,
                        dislikes : sauce.dislikes,
                        usersLiked : sauce.usersLiked,
                        usersDisliked : sauce.usersDisliked
                    })
                    .then(() => res.status(200).json({
                        message: 'Sauce modifié!'
                    }))
                    .catch(error => res.status(401).json({
                        error
                    }))
            
        })
        .catch((error) => {
            res.status(400).json({
                error
            })
        })
}