//Scripts 

const fs = require('fs')

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


var db = connect('mongodb://localhost/inventory-app');
db.products.drop()
db.users.drop()
db.categories.drop()

fs.readFile('db.json', 'utf-8', (err, data) => {
    if (err) throw err
    const parsedData = JSON.parse(data)
    var users
    var categories
    var produceId
    var freezerId
    var dryStorageId
    var coldStorageId

    if (parsedData.users) {
        users = db.users.insertMany(parsedData.users)
        // console.log(users.insertedIds[0])
    }



    if (parsedData.categories) {
        parsedData.categories.forEach(category => {
            if (category.userId) {
                category.userId = users.insertedIds[0]



            }
        })
        db.categories.insertMany(parsedData.categories)
        categories = db.categories.find()
        // console.log(categories)
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

        const newProducts = parsedData.products.map(product => {

            if (PRODUCE.includes(product.name)) {
                product.categoryId = produceId

            } else if (COLD_STORAGE.includes(product.name)) {
                product.categoryId = coldStorageId
            } else if (DRY_STORAGE.includes(product.name)) {
                product.categoryId = dryStorageId
            } else if (FREEZER.includes(product.name)) {
                product.categoryId = freezerId
            }
            return product
        })

        db.products.insertMany(parsedData.products)
    }
})






