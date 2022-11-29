const jwt = require('jsonwebtoken')
const { createError } =   require('../../../utils/error')
const middleware = {

    verifyToken: (req,res,next) => {
        const token =  req.cookies.access_token;
        if(!token) {
            return next(createError(401,"you are not authenticated!:"))
        }
        jwt.verify(token,process.env.JWT_ACCESS_KEY, (err, user)=> {
            if(err)  return next(createError(403,"Token is not valid!:"))
            req.user  = user;
            next()  
        }) 
    },
    verifyUser: (req,res,next)=> {
        middleware.verifyToken(req,res, () => {
            if(req.user.id === req.params.id  ||  req.user.isAdmin){
                next()
            }else {
                res.status(401).json("you're not authenticated")
    
            }
        })
    },
    verifyAdmin:  (req,res,next)=> {
        middleware.verifyToken(req,res,next, () => {
            if(req.user.isAdmin){
                next()
            }else {
                if(err)  return next(createError(403,"You are not authorized!"))
    
            }
        })
    }
}
module.exports = middleware