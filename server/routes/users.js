const express = require('express');
const router = require('express').Router();
let User = require('../models/user');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/sign-up').post((req, res) => {
  User.findOne({email: req.body.email.toLowerCase()})
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/log-in').post((req, res) => {
  User.findOne({
    email: req.body.email.toLowerCase(),
    password: req.body.password
  })
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;
  const isAdmin = req.body.isAdmin;

  const newUser = new User({email, password, isAdmin});

  newUser.save()
    .then(() => res.json(newUser))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.password = req.body.password;
      user.isAdmin = req.body.isAdmin;

      user.save()
        .then(() => res.json('user updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user.isAdmin))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
