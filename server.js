/*
server.js -> the backend server that serves up data for the frontend ReactJS code.
This program listens on port 5000 and imports all of the controllers necessary to serve data to the front end as needed.

All API endpoints are named as such in the CAEBO-company-hub/controllers/ folder.

Isaac Prost Februrary 2020
*/
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Allow all CORS requests
app.use(cors());

// For testing backend functions only. This will tell the server to look in the public folder (not the public folder inside of the client folder, which is the frontend)
// Any html you use to test backend should be put there. (CAEBO-company-hub/public/)
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'user_sid',
    secret: 'steffensniffsfarts',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

var users = require('./controllers/users/users');
var deleteUser = require('./controllers/users/deleteuser');
var register = require('./controllers/users/register');
var groups = require('./controllers/groups/groups');
var login = require('./controllers/login/login');
var newgroup = require('./controllers/groups/groupadd');
var groupdelete = require('./controllers/groups/groupdelete');
var userRemoval = require('./controllers/groups/userRemoval');
var groupjoin = require('./controllers/groups/groupjoin');
var event = require('./controllers/calendar/events');
var eventadd = require('./controllers/calendar/eventadd');
var eventdelete = require('./controllers/calendar/eventdelete');
var usereventget = require('./controllers/calendar/usereventget');
var eventInvite = require('./controllers/calendar/eventInvite');
var profile = require('./controllers/profile/profile');
var dashboard = require('./controllers/dashboard/dashboard');
var logout = require('./controllers/logout/logout');
var reauth = require('./controllers/users/reauth');
var updateUser = require('./controllers/users/updateUser');
var groupAdmin = require('./controllers/groups/groupAdmins');
var getUserByGroup = require('./controllers/users/getUserByGroup');


app.use('/api/users', users);
app.use('/api/users/delete', deleteUser);
app.use('/api/users/register', register);
app.use('/api/users/login', login);
app.use('/api/users/reauth', reauth);
app.use('/api/users/update', updateUser);
app.use('/api/users/group', getUserByGroup);
app.use('/api/dashboard', dashboard);
app.use('/api/groups', groups);
app.use('/api/groups/groupadd', newgroup);
app.use('/api/groups/groupdelete', groupdelete);
app.use('/api/groups/groupAdmin', groupAdmin);
app.use('/api/groups/userRemoval', userRemoval);
app.use('/api/groups/groupjoin', groupjoin);
app.use('/api/calendar/events', event);
app.use('/api/calendar/eventadd', eventadd);
app.use('/api/calendar/eventdelete', eventdelete);
app.use('/api/calendar/usereventget', usereventget);
app.use('/api/calendar/eventinvite', eventInvite);
app.use('/api/profile', profile);
app.use('/api/logout', logout);

app.listen(port, () => console.log(`Listening on port ${port}`));