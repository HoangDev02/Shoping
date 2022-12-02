const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    products: [
      {
        product_Id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "tbl_product"
        },
        quantity: Number,
        name: String,
        img: String,
        price: Number,
        total: {
          type: Number,
        },
      }
    ],
    active: {
      type: Boolean,
      default: true
    },
    modifiedOn: {
      type: Date,
      default: Date.now
    },
    subtotal: {
      type: Number,
      default: 0,
    },
    __v: { type: Number, select: false }
  });

module.exports = mongoose.model("Cart", CartSchema);