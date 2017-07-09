var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csurf = require('csurf');
var express = require('express');
var User = require('./models');


module.exports = function profile() {
    var user = new User();
    var address = new Address();
    address.givenName = req.user.givenName;
    address.surname = req.user.surname;
    address.save(function(err) {
        if (err) {
            console.log(err);
        }
        res.json('Address added to DB');
    });
};
