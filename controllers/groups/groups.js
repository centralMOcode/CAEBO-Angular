/*
groups.js -> handles the /api/groups path calls.
/api/groups -> display all group names.
/api/groups/<group_name> -> display name and ID of passed group.
By Isaac Prost, February 2020.
*/
var express = require('express');
var router = express.Router();

// Default /api/groups API call. Queries all group names in DB.
router.get('/', function(req,res) {
  var connectDB = require('../../connectDB.js');
    var sql = 'SELECT * FROM groups WHERE 1';
    connectDB.con.query(sql, function (err, result, fields){
      if (result !== undefined || result !== ""){
        console.log(result);
        res.status(200).json(result);
      } else {
        res.status(500).json({ serverError: 'A server error has occurred. Try again in a few minutes.' });
      }
    });
});

// USE: /api/groups/<group_name> API call fro querying a signle group name and ID.
router.get('/:group_id', function(req, res){
  var connectDB = require('../../connectDB.js');
    var sql = 'SELECT * FROM groups WHERE group_id = ?';
    connectDB.con.query(sql, [req.params.group_id], function (err, result, fields){
      if (result !== undefined || result !== ""){
        res.status(200).json(result);
      } else {
        res.status(404).json({ notFound: `Group with ID ${req.params.group_id} not found.` });
      }
  });
});

module.exports = router;