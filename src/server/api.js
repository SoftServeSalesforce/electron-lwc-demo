require('dotenv').config();
// Simple Express server setup to serve for local testing/dev API server
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const jsforce = require('jsforce');
const connectionService = require('../../scripts/connectionService');
const {CLIENT_ID, CLIENT_SECRET, REDIRECT_URL, LOGIN_URL} = process.env;
let LocalStorage = require('node-localstorage').LocalStorage;
let lcStorage = new LocalStorage('./config');
const app = express();
const bodyParser = require("body-parser");

var oauth2 = new jsforce.OAuth2({
    loginUrl : LOGIN_URL,
    clientId : CLIENT_ID,
    clientSecret : CLIENT_SECRET,
    redirectUri : REDIRECT_URL
});

app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies
const HOST = process.env.API_HOST || 'localhost';
const PORT = 3002;
let conn;
app.get('/api/v1/endpoint', (req, res) => {
    res.json({ success: true });
});

app.listen(PORT, () =>
    console.log(
        `✅  API Server started: http://${HOST}:${PORT}/api/v1/endpoint`
    )
);

app.get('/oauth2/auth', function(req, res) {
    //res.redirect(oauth2.getAuthorizationUrl({ scope : 'full' }));
    res.redirect(oauth2.getAuthorizationUrl({ scope : 'full' }));
});

app.get('/oauth2/callback', function(req, res) {
    conn = new jsforce.Connection({ oauth2 : oauth2 });
    let code = req.param('code');
    conn.authorize(code, function(err, userInfo) {
        if (err) { return console.error(err); }

        lcStorage.setItem('accessToken', conn.accessToken ? conn.accessToken : '');
        lcStorage.setItem('refreshToken', conn.refreshToken ? conn.accessToken : '');
        lcStorage.setItem('instanceUrl', conn.instanceUrl ? conn.instanceUrl : '');
        res.redirect(`http://localhost:3001/`);
    });
});

app.get('/isAuthorized', (req, res) => {
    let result = connectionService.getConnection() ? true : false;
    res.send(result)
});

app.get('/getAccounts', (req, res) => {
    let connection = connectionService.getConnection();
    if(connection){
        connection.query("SELECT Id, Name FROM Account", function(err, result) {
            if (err) {
                console.log('err');
                console.log(err);
            }else {
                console.log(result);
                res.json(result);
            }
        });
    }
});

app.post('/updateAccount', (req, res) => {
    // Single record update
    let connection = connectionService.getConnection();
    connection.sobject("Account").update({
        Id : req.body.recordId,
        Name : req.body.accountName
    }, function(err, ret) {
        if (err || !ret.success) {
            lcStorage.clear();
            res.redirect(`http://localhost:3001/`);
            return res.json({status: 'ERROR', err: err});
        }
        return res.json({status: 'SUCCESS'});
    });

})