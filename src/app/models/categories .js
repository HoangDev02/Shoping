const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const slug = require('mongoose-slug-generator');
const categories = new mongoose.Schema(
    {
        name: {
            type: String,
        }
    }, 
    {timestamps: true}
    
)
mongoose.plugin(slug);

module.exports = mongoose.model('tbl_categories_product', categories);
