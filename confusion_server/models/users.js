var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

let user = new Schema({
    admin: {
        type: "boolean",
        default: false
    }
})
user.plugin(passportLocalMongoose)
let users = mongoose.model('users', user);
module.exports=users;