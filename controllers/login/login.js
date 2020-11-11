/*
I have reverted this to the api/login route. Uses JWT to sign a token and give to client.
Modifed March 2020 by Isaac
*/
var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const ValidateLoginInput = require("../../validation/login");

router.post('/', function(req, res) {
    const { errors, isValid } = ValidateLoginInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    
    var connectDB = require("../../connectDB");
    var checkSQL = 'SELECT * from user WHERE email=?;';
    connectDB.con.query(checkSQL, [req.body.email], function (err, result, fields) {
        if (result === undefined || result == ""){
            return res.status(404).json({ emailnotfound: "Email not found"});
        } else {
            var sql = 'SELECT user_id, first_name, last_name, username, email, group_id, group_admin, groups.group_name FROM user NATURAL JOIN groups WHERE email=? AND pass=SHA2(?, 512);';
            connectDB.con.query(sql, [req.body.email, req.body.pass], function (err, result, fields) {
                if (result === undefined || result == "") {
                    return res.status(404).json({ passwordincorrect: "Password is incorrect"});
                } else {
                    // Email and password are a match
                    console.log(result);
                    var userid = JSON.stringify(result[0].user_id);
                    var username = JSON.stringify(result[0].username);
                    var first_name = JSON.stringify(result[0].first_name);
                    var last_name = JSON.stringify(result[0].last_name);
                    var email = JSON.stringify(result[0].email);
                    var group_id = JSON.stringify(result[0].group_id);
                    var group_admin = JSON.stringify(result[0].group_admin);
                    var group_name = JSON.stringify(result[0].group_name);

                    // Create JWT payload, we can modify will more data if need be
                    // I'm thinking we can reference userid to query data from our api/users/:user_id route
                    const payload = {
                        id: userid,
                        username: username,
                        first_name: first_name,
                        last_name: last_name,
                        email: email,
                        group_id: group_id,
                        group_admin: group_admin,
                        group_name: group_name
                    };

                    // Sign token
                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        {
                            expiresIn: 31556926 
                        },
                        (err, token) => {
                            res.status(200).json({
                                statusCode: 0,
                                statusDesc: 'Success',
                                message: {
                                    success: true,
                                    token: "Bearer " + token
                                }
                            });
                        }
                    );

                    
                }
            })
        }
    })
})

module.exports = router;