const express = require('express');
const router = require('express').Router();
let Profile = require('../models/profile');

router.route('/').get((req, res) => {
  Profile.find()
    .then(profiles => res.json(profiles))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Profile.find({userId: req.params.id})
    .then(profiles => res.json(profiles))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const userId = req.body.userId;
  const name = req.body.name;
  const gender = req.body.gender;
  const birthdate = Date.parse(req.body.birthdate);
  const city = req.body.city;

  const newProfile = new Profile({
    userId,
    name,
    gender,
    birthdate,
    city
  });

  newProfile.save()
    .then(() => res.json('profile added!'))
    .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/profile/:id').get((req, res) => {
  Profile.findById(req.params.id)
    .then(profile => res.json(profile))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Profile.findByIdAndDelete(req.params.id)
    .then(() => res.json('profile deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/all/:id').delete((req, res) => {
  Profile.deleteMany({userId: req.params.id})
    .then(res => res.json("profiles deleted!"))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  const name = req.body.name;
  const gender = req.body.gender;
  const birthdate = Date.parse(req.body.birthdate);
  const city = req.body.city;

  Profile.findById(req.params.id)
    .then(profile => {
      profile.name = name;
      profile.gender = gender;
      profile.birthdate = birthdate;
      profile.city = city;

      profile.save()
        .then(() => res.json('profile updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;