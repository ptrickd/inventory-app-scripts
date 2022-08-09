//Script backing up a mongodb database to a json file

const fs = require('fs')
const mongoose = require('mongoose')
const Product = require('./models/product.model.js')
const User = require('./models/user.model')
const Category = require('./models/category.model')
const Report = require('./models/report.model')


module.exports = {

    backupDb: async () => {
        try {

            await mongoose.connect('mongodb://localhost:27017/inventory-app');

            var products = await Product.find()

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

            var users = await User.find()
            let usersArr = []
            users.forEach((user) => {
                usersArr.push({
                    email: user.email,
                    password: user.password
                })
            })

            var categories = await Category.find()
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

            setTimeout(function () {
                mongoose.disconnect();
            }, 1000);

        } catch (err) {
            console.log(err)
        }
    }
}

const writeToFile = (arg) => fs.writeFile('db.json', arg, (err) => {
    if (err) throw err
})




