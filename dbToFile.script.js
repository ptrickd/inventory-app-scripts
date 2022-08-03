//Script backing up a mongodb database to a json file

const fs = require('fs')

var db = connect('mongodb://localhost/inventory-app');

const dbToFile = () => {

    //Products is not a array but a cursor
    var products = db.products.find()

    let productsArr = []
    products.forEach((product) => {
        productsArr.push({
            name: product.name,
            categoryId: product.categoryId,
            currentAmount: product.currentAmount,
            previousAmount: product.previousAmount,
            userId: product.userId,
            unit: product.unit
        })
    })

    var users = db.users.find()
    let usersArr = []
    users.forEach((user) => {
        usersArr.push({
            email: user.email,
            password: user.password
        })
    })

    var categories = db.categories.find()
    let categoriesArr = []
    categories.forEach((category) => {
        categoriesArr.push({
            name: category.name,
            userId: category.userId
        })
    })

    let finalObj = {}
    finalObj.products = productsArr
    finalObj.users = usersArr
    finalObj.categories = categoriesArr

    //use stringify(data,null,4) to write a human readable format
    writeToFile(JSON.stringify(finalObj, null, 4))

}

const writeToFile = (arg) => fs.writeFile('db.json', arg, (err) => {
    if (err) throw err
})

dbToFile()


