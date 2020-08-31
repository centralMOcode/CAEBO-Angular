/*
This route is meant to be called after an event is created by a user. This will query the last event 
put into the database and also add an entry under the user_events table for the user who created the event.
*/

var express = require('express');
var router = express.Router();

router.post('/', function(req,res) {
    var connectDB  = require('../../connectDB.js');
    var sql = 'SELECT * FROM events ORDER BY `event_id` DESC LIMIT 1;';
    connectDB.con.query(sql, function(err, result, fields){
        if(result === undefined || result === "" || result === null){
            res.status(404).json({ internalError: 'Opps... there was an internal server error' });
        } else {
            console.log(result);
            var sqlUserEvents = 'INSERT INTO user_events(user_id, event_id) VALUES(?, ?);';
            connectDB.con.query(sqlUserEvents, [req.body.user_id, result[0].event_id], function (err, result, fields){
                if (result.affectedRows > 0 ) {
                    res.json({ success: "Event created and user has been invited!" });
                } else {
                    res.status(400).json({ internalError: "Internal server error..." });
                }
            })
        }
    })
})

module.exports = router;