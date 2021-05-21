if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('mongo-connect')
const flash = require('express-flash')
const passport = require('passport')
const routes = require('./routes/routes')
const authRoutes = require('./routes/authRoutes')
require('./passSetUp')

const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))// allow headers from url
app.use(express.json())// allow json headers

//mongoose connection start
mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    app.listen(3000 || process.env.PORT, () => console.log(`running`))
  }).catch(err => console.log(err))
//mongoose connection end

app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: {
    secure: true,
    maxAge: 8 * 60 * 60
  },
  store: MongoStore.create({
    clientPromise,
    dbName: 'sessions'
  }),
  saveUninitialized: false,
  resave: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use("/auth", authRoutes)
app.use(routes)