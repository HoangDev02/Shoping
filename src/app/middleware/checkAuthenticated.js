
const checkLoginUser = {
  //check user login
  checkAuthenticated : async (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    
    res.redirect('/auth/login')
  },

  checkNotAuthenticated : async (req, res, next) => {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }
  
}
module.exports = checkLoginUser
