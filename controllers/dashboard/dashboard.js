/* 
dashboard.js -> handles the /api/dashboard/:user path API calls
The api/dashboard path is not defined here, it is defined in server.js in the app.use('/api/dashboard, requireLogin, dashboard) function after
importing this file into a var

This route will be called when a user tries to access their dashboard. I use session data to access, if there is no session data, redirect to login.
By Isaac Prost, February 2020
*/

var express = require('express');
var router = express.Router();

//this will eventually direct to the user's dashboard page
router.get('/:username', function(req, res) {
    //checks if the username in session array matches the url parameter
    if (req.session.userdata == undefined ) {
        res.redirect('/?redirect=1');
    } else if (req.session.userdata[1] == req.params.username) {
        res.send(`<h1>Dashboard for ${req.session.userdata[1]}</h1><br> user_id: ${req.session.userdata[0]}<br> username: ${req.session.userdata[1]}<br> email: ${req.session.userdata[2]}`);
    } 
    
})
module.exports = router;