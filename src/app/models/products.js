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
        content: {
            type: String, 
        },
        img: {
            type: String,     
        },
        hotproducts:  {
            type : String,
        },
        price: {
            type: Number,
            
        }
    },  { timestamps: true }
)

  
  module.exports =  mongoose.model("tbl_product", products);