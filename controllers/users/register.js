/*
newuser.js -> newuser.js adds a user to the database
this is supposed to be used in conjunction with a create user button and form
to be able to submit everything to the database. 

Kyle Graber, February 2020

Modified by Isaac to JWT and validation March 2020
renamed to register.js
*/

var express = require('express');
var router = express.Router();

const validateRegisterInput = require("../../validation/register");

router.post("/", function(req, res) {

    // Validation
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    var connectDB = require('../../connectDB');
    var sql = 'SELECT email FROM user WHERE email=?;';
    connectDB.con.query(sql, [req.body.email], function (err, result){
        // Check if email is not in database
        if (result === undefined || result == ""){
            if (err) throw err;
            
            // Check if username is not in the database
            var sql = 'SELECT user_id FROM user WHERE username=?;';
            connectDB.con.query(sql, [req.body.username], function (err, result){
                if (err) throw err;

                if (result === undefined || result == ""){
                    
                    // Insert user into database
                    var sqlInsert = 'INSERT INTO user(username, first_name, last_name, email, pass, group_id, group_admin) VALUES(?, ?, ?, ?, sha2(?, 512), 1, 0);';
                    connectDB.con.query(sqlInsert, [req.body.username, req.body.first_name, req.body.last_name, req.body.email, req.body.pass], function (err, result, fields){
                        if (err) throw err;

                            const newUser = {
                                username: req.body.username,
                                first_name: req.body.first_name,
                                last_name: req.body.last_name,
                                email: req.body.email,
                            }
                            
                            res.status(200).json({
                                statusCode: 0,
                                statusDesc: 'Success',
                                message: newUser
                            });
                    })

                } else {
                    res.status(404).json({ 
                        statusCode: -1,
                        statusDesc: 'Failure',
                        message: {
                            usernameunavailable: "Username is already in use"
                        } 
                    });
                }
            })
        } else {
            res.status(404).json({ 
                statusCode: -1,
                statusDesc: 'Failure',
                message: {
                    emailunavailable: "Email is already in use"
                }
             });
        }
    })

})

module.exports = router;