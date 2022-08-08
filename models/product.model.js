const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    currentAmount: {
        type: Number,
        default: 0
    },
    previousAmount: {
        type: Number,
        default: 0
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    unit: {
        type: String,
        required: true
    }
})



const Product = mongoose.model('Product', schema)
module.exports = Product