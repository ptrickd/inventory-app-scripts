const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productId: String,
    amount: Number,
    name: String,
    categoryId: String
})

const reportSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        unique: true
    },
    products: [productSchema],
    hasBeenSubmitted: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date
    },
    dateSubmitted: {
        type: Date,
        required: true
    }
})

const Report = mongoose.model('Report', reportSchema)
module.exports = Report