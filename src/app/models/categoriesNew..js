const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const slug = require('mongoose-slug-generator');
const categoriesNewShcema = new mongoose.Schema(
    {
        tbl_category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        name: {
            type: String,
        }
    }, 
    {timestamps: true}
    
)
mongoose.plugin(slug);

module.exports = mongoose.model('tbl_categories_new', categoriesNewShcema);
