const mongoose = require('mongoose')

const orderDetailShcema = mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tbl_product'
    },
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tbl_order'
    },
    product: {
        type: String
    },
    number: {
        type: Number
    }
    }, {timestamps: true, }
)

module.exports = mongoose.model('tbl_order_detail', orderDetailShcema);