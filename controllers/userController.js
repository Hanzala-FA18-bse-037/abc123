const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

// All Data
router.get('/',function (req,res){
    User.find((err,doc) => {
        if (!err) {
            res.render('user/index',{
                list: doc
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    })
});

// Create Form
router.get('/Register',function (req,res){
    return res.render("Register");
});

router.get('/Login',function (req,res){
    return res.render("Login");
});

// Store Value
router.post('/',function (req,res){
    var user = new User();
    user.name = req.body.name
    user.email = req.body.email;
    user.address = {
        street_address: req.body.street_address,
        city: req.body.city,
        country: req.body.country
    };
    user.gender = req.body.gender;
    user.save((err, doc) => {
        if (!err)
            return res.redirect("/user")
        else {
            if (err.name === 'ValidationError') {
                handleValidationError(err, req.body);
                console.log(req.body);
                res.render("user/create",req.body)
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });

});

// Show Update Form
router.get('/:id/edit',function (req, res) {
    User.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("user/update", doc);
        }
    });
});

// Update Record
router.put('/:id',function (req, res) {
    User.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('/user'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: 'Update Employee',
                    employee: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
});
// Remove Record
router.get('/delete/:id',function (req, res) {
    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/user');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});
function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'name':
                body['nameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            case 'gender':
                body['genderError'] = err.errors[field].message;
                break;
            case 'password':
                body['passwordError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}
module.exports = router;
