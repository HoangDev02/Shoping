const mongoose = require('mongoose');

const products = new mongoose.Schema(
    {
        category_product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "tbl_categories_products",
        },
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        img: {
            type: String,     
        },
        price: {
            type: Number,
            
        }
    },  { timestamps: true }
)
  module.exports =  mongoose.model("tbl_product", products);