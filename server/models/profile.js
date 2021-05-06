const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  userId: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  gender: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  birthdate: {
    type: Date,
    required: true,
    trim: true,
    minlength: 3
  },
  city: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
});

const Profile = mongoose.model('Profile', profileSchema, 'profiles');

module.exports = Profile;