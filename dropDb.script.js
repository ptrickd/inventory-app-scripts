//drop all the collection of the database
const mongoose = require('mongoose')
const Product = require('./models/product.model.js')
const User = require('./models/user.model')
const Category = require('./models/category.model')
const Report = require('./models/report.model')

module.exports = {
    drop: async () => {
        try {
            await mongoose.connect('mongodb://localhost:27017/inventory-app')
            await Category.deleteMany()
            await User.deleteMany()
            await Product.deleteMany()

            setTimeout(function () {
                mongoose.disconnect();
            }, 1000);
        }
        catch (err) {
            console.log(err)
        }
    }
}
