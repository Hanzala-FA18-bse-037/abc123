var mongoose = require('mongoose');

facultyScehma = new mongoose.Schema({
    name: {
        type: String,
        required: "Name is required."
    },
    gender: {
        type: String,
        enum: [
            'Male', 'Female', 'Others'
        ],
        required: 'Gender is Required'
    },
    email: {
        type: String,
        required: 'Email is required'
    },
    address: {
        street_address: {
            type: String,
            required: 'Street Address is required'
        },
        city: {
            type: String,
            required: "City is Required"
        },
        country: {
            type: String,
            required: 'Country is Required'
        }
    },
    course_code: {
        type: String
    },
    phone_numbers: {
        type: Array
    }
});

// Custom validation for email
facultyScehma.path('email').validate((val) => {
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid E-mail Format.');
const Faculty = mongoose.model('Faculty',facultyScehma);
module.exports = Faculty