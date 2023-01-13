const express = require("express")

const app = express()

app.listen(3000)

app.get("/", (req,res) => {
    res.send("Hello " + req.query.prenom)
})

app.get("/:productId/utilisateur/:userId", (req,res) => {
    res.send("Produit " + req.params.productId + ", utilisateur " +  req.params.userId)
})

app.get("/products/:productId", (req,res) => {
    res.json({
        productId : req.params.productId
    })
})

app.get("/products" , (req,res) => {
    res.json([
        {
            productId : 1
        },
        {
            productId : 2
        }
    ])
})

app.post("/products" , (req,res) => {
    console.log("hello")
    res.send()
})