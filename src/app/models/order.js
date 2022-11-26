const mongoose = require('mongoose')
const internal = require('stream')

const orderSchema = mongoose.Schema({
    User_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tbl_product'
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    status: {
        type: String
    },
    phone: {
        type: Number
    },
    address: {
        type: String
    },
    client: {
        type: String
    },
    note: {
        type: String
    }
}, {timestamps: true, }
)
module.exports = mongoose.model('tbl_order', orderSchema)