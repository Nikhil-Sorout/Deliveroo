const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true
    },
    phone: {
        type: String,
        required: [true, "Enter phone number"],
        maxLength: [10, "Phone number can't exceed 10 digits"],
        validate: {
            validator: function (v) {
                // Ensure the phone number is numeric and has a length of 10
                return /^[0-9]{10}$/.test(v);
            },
            message: 'Invalid phone number. It should be numeric and have a length of 10.',
        },
},
    password: {
    type: String,
    required: [true, "Password please!"],
    minLength: [4, "min length of password should be 4"]
}

})

module.exports = mongoose.model('User', userSchema);