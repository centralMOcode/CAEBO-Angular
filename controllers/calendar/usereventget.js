/* 
usereventget.js -> handles the /api/events path API calls

This is the API call for querying all the users for a single event. This is a major function of the calendar system
so the front end can call it.  

By Kyle Graber, April 2020
*/

var express = require('express');
var router = express.Router();

// Default /api/events API call. Queries all events assosicated with a User in the DB.
router.get('/:user_id', function(req,res) {
  var connectDB  = require('../../connectDB.js');
    var sql = 'SELECT user_id, username, first_name, last_name, title, event_id, e_description, e_time_start, e_time_end, e_date FROM user NATURAL JOIN user_events NATURAL JOIN events WHERE user_id=?;';
    connectDB.con.query(sql, req.params.user_id ,function (err, result, fields){
      if (result === undefined || result === ""){
        return res.status(404).json({ eventnotfound: "No events found"});
      } 
      else {
        var eventString = JSON.stringify(result);
        console.log(result);
        res.send(eventString);
      }
    })
})

module.exports = router;