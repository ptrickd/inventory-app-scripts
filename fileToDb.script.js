//Scripts 

// const fs = require('fs')
const { readFile } = require('fs/promises');

const mongoose = require('mongoose')
const Product = require('./models/product.model')
const User = require('./models/user.model')
const Category = require('./models/category.model')

var dropDb = require('./dropDb.script')

const PRODUCE = [
    'Cucumber',
    'Apples',
    'Lettuce',
    'Arugula',
    'Romaine',
    'Beets',
    'Tomato',
    'Carrots'
]

const COLD_STORAGE = ['Ground Beef', 'Dough']

const FREEZER = [
    'Frozen Ground Beef',
    'French Fries',
    'Cheesecake',
    'Tiramisu',
    'Frozen Burger Patty',
    'Sweet Potatoe Fries'
]

const DRY_STORAGE = [
    'Flour',
    'Salt',
    'Sugar',
    'Rice Basmati',
    'Spagetthi',
    'Penne',
    'Potato']

const LINE = []
module.exports = {


    resetDb: async () => {
        try {
            const db = await mongoose.connect('mongodb://localhost:27017/inventory-app');
            await dropDb.drop()

            const data = await readFile('db.json', 'utf-8')

            const parsedData = JSON.parse(data)
            var users
            var categories
            var produceId
            var freezerId
            var dryStorageId
            var coldStorageId

            if (parsedData.users) {
                users = await User.insertMany(parsedData.users)
            }

            if (parsedData.categories) {
                parsedData.categories.forEach(category => {
                    if (category.userId) {
                        category.userId = users[0]._id
                    }
                })

                await Category.insertMany(parsedData.categories)
                categories = await Category.find()

                categories.forEach(category => {
                    switch (category.name) {
                        case 'Produce':
                            produceId = category._id
                            break;
                        case 'Freezer':
                            freezerId = category._id
                            break;
                        case 'Dry Storage':
                            dryStorageId = category._id
                            break;
                        case 'Cold Storage':
                            coldStorageId = category._id
                            break;

                        default:
                            break;
                    }

                })
            }

            if (parsedData.products) {

                const newProducts = []
                parsedData.products.forEach(product => {

                    if (PRODUCE.includes(product.name) && !undefined) {

                        product.categoryId = produceId
                        product.userId = users[0]._id
                        newProducts.push(product)
                    } else if (COLD_STORAGE.includes(product.name) && !undefined) {

                        product.categoryId = coldStorageId
                        product.userId = users[0]._id
                        newProducts.push(product)
                    } else if (DRY_STORAGE.includes(product.name) && !undefined) {

                        product.categoryId = dryStorageId
                        product.userId = users[0]._id
                        newProducts.push(product)
                    } else if (FREEZER.includes(product.name) && !undefined) {

                        product.categoryId = freezerId
                        product.userId = users[0]._id
                        newProducts.push(product)
                    }
                })

                await Product.insertMany(newProducts)
            }

            setTimeout(function () {
                mongoose.disconnect();
            }, 1000);
        } catch (err) {
            console.log(err)
        }


    }

}










