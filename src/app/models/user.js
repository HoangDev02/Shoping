const mongoose = require('mongoose');

const slug = require('mongoose-slug-generator');

const UserSchema = new mongoose.Schema({
   username: {
       type: String,
       required: true,
       unique: true,
   },
   email: {
       type: String,
       required: true,
       unique: true
   },
   password: {
       type: String,
       required: true
   },
   sex: {
     type: String,

   },
   date: {
     type: String,
   },
   phone: {
     type: String,
   },
   isAdmin: {
    type: Boolean,
    default: false,
   }
   }, {timestamps: true, }
 
);

 mongoose.plugin(slug);

module.exports = mongoose.model('User', UserSchema);