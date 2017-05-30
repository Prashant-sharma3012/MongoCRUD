var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/db1');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// create a schema
var userSchema = new Schema({
    name: String,
    phone: Number,
    email: String,
    ads: [{
        id: Number,
        product: String,
        desc: String,
        cost: Number,
        location: String,
        Contact: Number
    }],
    created_at: Date,
    updated_at: Date
}, {
    versionKey: false // No versions will be created on update, thats not really required here
});

userSchema.index({
    phone: Number,
    email: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;