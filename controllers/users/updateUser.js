var express = require('express');
var router = express.Router();

const validateUserInput = require("../../validation/user");

router.put('/', function(req, res){

    // Validate data in request body
    const { errors, isValid } = validateUserInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    var connectDB  = require('../../connectDB.js');
    var checkUsernameEmail = "SELECT * FROM user WHERE user_id <> ? AND username=? OR user_id <> ? AND email=?;";
    connectDB.con.query(checkUsernameEmail, [req.body.user_id, req.body.username, req.body.user_id, req.body.email], function (err, result, fields) {
        if (err) throw err;

        if (result === undefined || result == "") {
            var sql = 'UPDATE user SET first_name = ?, last_name = ?, username = ?, email = ?  WHERE user_id = ?;';
            connectDB.con.query(sql, [req.body.first_name, req.body.last_name, req.body.username, req.body.email, req.body.user_id], function (err, result, fields){
                if (err) throw err;
                
                res.status(200).json({ userTableUpdate: "User info has been updated" });
          })
        } else {
            res.status(404).json({ cannotUpdate: "Cannot update, username or email already exists" });
        }
    })

})

module.exports = router;