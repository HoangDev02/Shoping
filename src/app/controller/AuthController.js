const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const createError = require('../../../utils/error')


const authController = {
    register: async (req,res,next) =>  {
        res.render('account/register' ,  {layout: false})
    },
    login: async (req,res,next) => {
        res.render('account/login',  {layout: false})
    },
    isregister : async (req, res,next) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
             const newusers= new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
            })
              await newusers.save()
            
              return res.status(200).redirect('/auth/login')
          }catch(err){
            next(err)
          }  
    },
    islogin  : async(req,res,next) => {
        try {
            const user = await User.findOne({username:req.body.username})
            if(!user) return next(createError(404, createError("wrong usename")))
            const isPassWordCorrect = await bcrypt.compare(req.body.password, user.password)
            if(!isPassWordCorrect) return next(createError(400, "wrong password or username"))

             const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_ACCESS_KEY, { expiresIn: "30s"})
             const {password, isAdmin, ...otherDetails} = user._doc
             res.cookie("access_token", token,{
                 httpOnly: true,
             }).status(200).redirect('/')

        }catch(err) {
            next(err)
        }
    }
}

module.exports = authController;