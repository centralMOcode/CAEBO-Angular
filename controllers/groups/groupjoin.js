var express = require('express');
var router = express.Router();

const validateGroupJoinInput = require('../../validation/groupJoin');

router.put('/', function(req, res) {
    // Validation
    const { errors, isValid } = validateGroupJoinInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    var connectDB  = require('../../connectDB.js');
    var insert = 'UPDATE user SET group_id=? WHERE user_id=?;';
    connectDB.con.query(insert, [req.body.group_id, req.body.user_id], function(err, result, fields){
        if (err) throw err;

        res.status(200).json({ success: 'User added to group.' });
    });
});

module.exports = router;