/*
deleteuser.js -> deleteuser.js delete a user from the database
for the unique person that decided they wanted to check the box and delete 
their user account. 

Kyle Graber, March 2020
*/

var express = require('express');
var router = express.Router();

router.delete('/', function(req, res) {
    var connectDB  = require('../../connectDB.js');
    var sql = 'DELETE FROM user WHERE user_id = ?';
    connectDB.con.query(sql, [req.body.user_id] ,function (err, result, fields){
        if (err) throw err;

        if (result.affectedRows === 0) {
            res.status(500).json({ serverError: 'An internal server error occurred.' });
        } else {
            res.status(200).json({ success: `User with ID ${req.body.user_id} has been deleted.` });
        }
    });
});

module.exports = router;