/* 
events.js -> handles the /api/events path API calls

This is the API call for querying the events all together. This is a major function of the calendar system
so the front end can call it.  

By Kyle Graber, April 2020
*/

var express = require('express');
var router = express.Router();

// Default /api/events API call. Queries specific events assosicated with a User in the DB based on user_id and a date.
router.get('/:user_id/:date', function(req,res) {
  //find out how the date param is passed
  var connectDB  = require('../../connectDB.js');
    var sql = 'SELECT user_id, username, first_name, last_name, title, event_id, e_description, e_time_start, e_time_end, e_date FROM user NATURAL JOIN user_events NATURAL JOIN events WHERE user_id=? AND e_date=?;';
    connectDB.con.query(sql, [req.params.user_id, req.params.date],function (err, result, fields){
      if (result === undefined || result === ""){
        return res.status(404).json({ eventnotfound: "Event Not Found"});
      } 
      else {
        var eventString = JSON.stringify(result);
        res.send(eventString);
      }
    })
})

module.exports = router;