const categories = require('../models/categories ');

const categoriesController = {

    //post
    createCategories: async(req,res,next) => {
        const newCategories = new categories(req.body);
        try {
            const savedcategories = await newCategories.save()
            res.status(200).json(savedcategories)
        } catch(err) {
            next(err)
        }
    },
    //Put
    updateCategories: async(req,res,next) => {
        try {
            const updateCategories = await categories.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
            res.status(200).json(updateCategories)
        }catch(err) {
            next(err)
        }
    },
    //delete
    deleteCategories: async(req,res,next) => {
        try {
            await categories.findByIdAndDelete(req.params.id);
            res.status(200).json("Categories has been delete")
        }catch(err) {
            next(err)
        }
    }

}
module.exports =  categoriesController;
