var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
  name: String,
  email: String,
  gender: {
    type: String,
    enum: [
        'Male', 'Female', 'Other'
      ],
    //required: 'Gender is Required'
  },
  password: String,
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
