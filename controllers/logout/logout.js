var express = require('express');
var router = express.Router();

router.get('/:username', function(req, res) {
    if(req.session.userdata !== undefined) {
        req.session.destroy(function(err) {
            res.redirect('../../index.html');
        })
    } else {
        res.send("No user logged in...");
    }
})

module.exports = router;