var mongoose = require ('mongoose');

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Add your name"
    }
});

var User= mongoose.model ('User', userSchema);
module.exports = User;