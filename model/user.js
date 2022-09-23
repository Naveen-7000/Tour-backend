const moongose = require("mongoose");

const userSchema = new moongose.Schema({
  fullname: {
    type: String,
    default: null,
  },
  phone: {
    type: String,
    default: null,
  },
  
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  token: {
    type: String,
  },
});

module.exports = moongose.model('user',userSchema);