const mongoose = require("mongoose");
const validator = require("validator");
var User = mongoose.model('User',{
    email:{
        type : String,
        required : true,
        trim : true,
        minlength : 1
    }
});
module.exports = {
    User
}
