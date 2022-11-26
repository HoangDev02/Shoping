const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser')
const app =express();
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const morgan = require('morgan');
const session = require('express-session')
const methodOverride = require('method-override')
const passport = require('passport')
const handlebars = require('express-handlebars');

const auth = require('./router/auth')
const site = require('./router/site')
const product = require('./router/product')
const categories = require('./router/categories')
const card = require('./router/card')
const port = 3000
dotenv.config();


//connect mongodb
const connect = async ()=> {
  try {
      await mongoose.connect(process.env.MONGODB);
      console.log("mongoose connected")
    } catch (error) {
      throw error
    }
};
mongoose.connection.on("disconnect", ()=> {
  console.log("mongoose disconnect")
})
 
app.use(cookieParser())
app.use(express.json())

//hbs
app.engine('hbs', 
  handlebars.engine({
  extname: '.hbs',
  helpers: {
  
  }
}));
  app.set('view engine', 'hbs');
  app.set('views', path.join(__dirname, 'resource', 'views'));

  //chuyen doi text qua json
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(methodOverride('_method'))


app.use(morgan('combined'))
//router
app.use('/auth', auth)
app.use('/product', product)
app.use('/categories', categories)
app.use('/card', card)
//test
app.get('/', function(req, res) {
  res.render('home');
});

app.listen(port, () => {
  connect()
  console.log(`Example app listening on port ${port}`)
})