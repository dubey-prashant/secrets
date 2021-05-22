const router = require('express').Router()
const User = require('../models/User')

const Authenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  req.flash('error', 'You are not Authenticated. Please login to proceed!')
  res.redirect('/auth/login')
}
router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('home', { isAuthenticated: true })
  } else {
    res.render('home', { isAuthenticated: false })
  }
})

router.get('/profile', Authenticated, (req, res) => {
  res.render('profile', { user: req.user })
})

router.get('/secrets', Authenticated, (req, res) => {

  User.find({ secret: { $ne: null } }, (err, user) => {
    if (err) console.log(err.message)
    if (user) res.render('secrets', { secrets: user })
  })
})

router.get('/submit', Authenticated, (req, res) => {
  res.render('submit')
})
router.post('/submit', Authenticated, (req, res) => {

  const reqSecret = req.body.secret

  // Secret.create({
  //   secret:reqSecret
  // })
  //   .then(() => {
  User.findById(req.user.id, (err, user) => {
    if (err) {
      res.redirect('/submit')
    } else {
      if (user) {
        user.secret = reqSecret
        user.save(() => res.redirect('/secrets'))
      }
    }
    // })
    // }).catch(err => {
    //   console.log(err.message)
  })


})

module.exports = router