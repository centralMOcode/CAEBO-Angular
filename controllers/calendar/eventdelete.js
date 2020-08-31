/*
eventdelete.js -> Deletes an Event from the events table
and the join table
This should be used for if a mistake was made when creating an event
or if the event got cancelled.

Kyle Graber, April 2020
*/
var express = require('express');
var router = express.Router();

router.post('/', function(req,res) {
    var connectDB  = require('../../connectDB.js');
    var sql = 'DELETE FROM user_events WHERE event_id=?;';
    connectDB.con.query(sql, req.body.event_id ,function (err, result, fields){
        if (result.affectedRows > 0){
            var sql = 'DELETE FROM events WHERE event_id = ?';
            connectDB.con.query(sql, req.body.event_id, function(err, result, fields){
                if (result.affectedRows > 0){
                    return res.status(200).json({ succes: "Event has been deleted"});
                } 
                else{
                    return res.status(404).json({ eventnotfound: "No events found"});
                }
        })} 
        else {      
            return res.status(404).json({ eventnotfound: "No events found"});   
        }
    })
})

module.exports = router;