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

    if (!isValid) {
        return res.status(400).json(errors);
    }
    
    var connectDB = require("../../connectDB");
    var checkSQL = 'SELECT * from user WHERE email=?;';
    connectDB.con.query(checkSQL, [req.body.email], function (err, result, fields) {
        if (result === undefined || result == ""){
            return res.status(200).json({ 
                statusCode: 100,
                statusDesc: 'Failure',
                message: {
                    error: "Email not found"
                }
            });
        } else {
            var sql = 'SELECT user_id, first_name, last_name, username, email, group_id, group_admin, groups.group_name FROM user NATURAL JOIN groups WHERE email=? AND pass=SHA2(?, 512);';
            connectDB.con.query(sql, [req.body.email, req.body.pass], function (err, result, fields) {
                if (result === undefined || result == "") {
                    return res.status(200).json({
                        statusCode: 200,
                        statusDesc: 'Failure',
                        message: {
                            error: "Password is incorrect"
                        }
                    });
                } else {
                    // const payload = {
                    //     id: JSON.stringify(result[0].user_id),
                    //     username: JSON.stringify(result[0].username),
                    //     firstName: JSON.stringify(result[0].first_name),
                    //     lastName: JSON.stringify(result[0].last_name),
                    //     email: JSON.stringify(result[0].email),
                    //     groupID: JSON.stringify(result[0].group_id),
                    //     groupAdmin: JSON.stringify(result[0].group_admin),
                    //     groupName: JSON.stringify(result[0].group_name)
                    // };
                    const payload = {
                        id: result[0].user_id,
                        username: result[0].username,
                        firstName: result[0].first_name,
                        lastName: result[0].last_name,
                        email: result[0].email,
                        groupID: result[0].group_id,
                        groupAdmin: result[0].group_admin,
                        groupName: result[0].group_name
                    };

                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        {
                            expiresIn: 1200000
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