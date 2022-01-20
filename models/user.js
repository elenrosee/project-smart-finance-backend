const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Email is required'],
      minlength: 6,
    },

    tokenLong: {
      type: String,
      default: null,
    },
    tokenShort: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
    },
    balance: {
      type: Number,
      default: null,
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = model('user', userSchema);

module.exports = {
  User,
  userSchema,
};