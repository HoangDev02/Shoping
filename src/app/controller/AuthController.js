const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')    
const MyUtil = require('../../../utils/error')
const authController = {
    register: async (req,res,next) =>  {
        res.render('account/register')
    },
    login: async (req,res,next) => {
        res.render('account/login')
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
            // if(!user) res.status(404).send('wrong user')
            if(!user){
                MyUtil.showAlertAndRedirect(res, 'Invalid login!', '/auth/login');
            }
            const isPassWordCorrect = await bcrypt.compare(req.body.password, user.password)
            if(!isPassWordCorrect){
                MyUtil.showAlertAndRedirect(res, 'wrong password or username', '/auth/login')
            }
            const payload ={username: user.username,id: user._id, isAdmin: user.isAdmin}
            const token = jwt.sign(payload, process.env.JWT_ACCESS_KEY, { expiresIn: "360s"})
             res.cookie("access_token", token,{
                 httpOnly: true,
             }).status(200).redirect('/')
        }catch(err) {
            next(err)
        }
    },
    // isLogOut : async (req,res,next) => {
    //     delete req.Cookie.access_token
    //     res.redirect('/')
    // }
}

module.exports = authController;