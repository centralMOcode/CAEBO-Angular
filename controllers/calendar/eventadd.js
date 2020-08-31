/*
eventadd.js -> adds event to the event table in the database.
The main use for this is for the user to be able to store different events and times
This is just a layout and will be modified for later. 

Kyle Graber, April 2020
*/
var express = require('express');
var router = express.Router();

router.post('/', function(req,res) {
    var connectDB  = require('../../connectDB.js');
    var sqlInsert = 'INSERT INTO events(title,  e_description, e_time_start, e_date) VALUES(?, ?, ?, ?);';
    connectDB.con.query(sqlInsert, [req.body.title, req.body.e_description, req.body.e_time_start, req.body.e_date], function (err, result, fields){
        if (err) throw err;
        
        if (result.insertId > 0 && req.body.user_id){
            var grab = 'SELECT * FROM events ORDER BY `event_id` DESC LIMIT 1;';
            connectDB.con.query(grab, function (err, result, fields){
                if (err) throw err;

                if(result === undefined || result === ""){
                    res.status(404).json({ eventNotFound: "No event found in the database..." });
                } else {
                    var sqlUserEvents = 'INSERT INTO user_events(user_id, event_id) VALUES(?, ?);';
                    connectDB.con.query(sqlUserEvents, [req.body.user_id, result[0].event_id], function (err, result, fields){
                        if (err) throw err;
                        
                        if (result.affectedRows > 0 ) {
                            res.json({ success: "Event created and user has been invited!" });
                        } else {
                            res.status(400).json({ internalError: "Internal server error..." });
                        }
                    })
                }
            })
        }else if (result.insertId > 0 && !req.body.user_id){
            res.status(200).json({ ok: "Event has been added with no invited user" });
        } else {
            res.status(400).json({ eventError: "Event could not be added to the database at this time"});
        }
    })
})

module.exports = router;