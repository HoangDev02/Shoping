const mongodb = require('mongoose')

const newShema = mongodb.Schema({
    category_new_id: {
        type: mongodb.Schema.Types.ObjectId,
        ref: 'tbl_categories_new'
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    context: {
        type: String
    },
    img: {
        type: String
    },
    hotnew: {
        type: String
    },
    viewed: {
        type: String
    },
    },  {timestamps: true}

)

module.exports = mongodb.model('tbl_new', newShema)