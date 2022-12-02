const jwt = require('jsonwebtoken')
const { createError } =   require('../../../utils/error')
const middleware = {

    verifyToken: (req,res,next) => {
        const token =  req.cookies.access_token;
        if(!token) {
            return res.status(401).send("you're not login")

        }
        jwt.verify(token,process.env.JWT_ACCESS_KEY, (err, user)=> {
            if(err) res.status(403).send("token is value!")

            req.user = user;
            next()  
        }) 
    },
    verifyUser: (req,res,next)=> {
        middleware.verifyToken(req,res, () => {
            if(req.user.id === req.params.id  ||  req.user.isAdmin){
                next()
            }else {
                res.status(401).send("you do not have access")
    
            }
        })
    },
    verifyAdmin:  (req,res,next)=> {
        middleware.verifyToken(req,res,next, () => {
            if(req.user.isAdmin){
                next()
            }else {
                -res.status(401).send("you do not have access")

    
            }
        })
    },
}
module.exports = middleware