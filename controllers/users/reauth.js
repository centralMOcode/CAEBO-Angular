var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

router.post('/', function(req, res){
    var connectDB  = require('../../connectDB.js');
    var sql = 'SELECT user_id, first_name, last_name, username, email, group_id, group_admin, groups.group_name FROM user NATURAL JOIN groups WHERE user_id=?';
    connectDB.con.query(sql, [req.body.user_id], function (err, result, fields){
        if (err) throw err;

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
                    expiresIn: 31556926 // 1 year
                },
                (err, token) => {
                    if (err) throw err;

                    res.status(200).json({
                        success: true,
                        token: "Bearer " + token
                    });
                }
            );
  })
})

module.exports = router;