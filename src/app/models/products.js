const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');


const products = new mongoose.Schema(
    {
        category_product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "tbl_categories_products",
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true

        },
        img: {
            type: String,     
        },
        price: {
            type: Number,
            
        }
    },  { timestamps: true }
)
mongoose.plugin(slug);

  module.exports =  mongoose.model("tbl_product", products);