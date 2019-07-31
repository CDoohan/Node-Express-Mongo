const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

// Load new currency type to Mongo
require('mongoose-currency').loadType(mongoose);

const favoriteSchema = new Schema({
    user:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dishes:  [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    }]
}, {
    timestamps: true
})

var Favorite = mongoose.model('Favorites', favoriteSchema);

module.exports = Favorite;