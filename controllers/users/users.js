/* 
users.js -> handles the /api/users path API calls
The api/users path is not defined here, it is defined in server.js in the app.use('/api/users', users) function after
importing this file into a var
By Isaac Prost, February 2020
*/

var express = require('express');
var router = express.Router();

// Defualt /api/users route. Returns all users and their groups;
router.get('/', function (req, res) {
    var connectDB  = require('../../connectDB.js');
    var sql = 'SELECT user_id, first_name, last_name, username, email FROM user WHERE 1';

    connectDB.con.query(sql, function (err, result){
      if (err) throw err;

      if (result === undefined || result == "") {
        res.status(500).json({ serverError: `An unexpected server error occured.` });
      } else {
        res.status(200).json(result);
      }
    })
})

// USE: /api/users/<user_id>. Queries the data of the specified user
router.get('/:user_id', function(req, res){
    var connectDB  = require('../../connectDB.js');
    var sql = 'SELECT user_id, first_name, last_name, username, email FROM user WHERE user_id=?';

    connectDB.con.query(sql, [req.params.user_id], function (err, result){
      if (err) throw err;

      if (result === undefined || result == "") {
        res.status(404).json({ notFound: `User with ID ${req.params.user_id} was not found` });
      } else {
        res.status(200).json(result);
      }
  })
})


module.exports = router;