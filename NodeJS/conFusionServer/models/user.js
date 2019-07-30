const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

// Load new currency type to Mongo
require('mongoose-currency').loadType(mongoose);

const userSchema = new Schema({
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    facebookId: String,
    admin:   {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

userSchema.plugin(passportLocalMongoose)

var User = mongoose.model('User', userSchema);

module.exports = User;