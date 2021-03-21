let LocalStorage = require('node-localstorage').LocalStorage;
let lcStorage = new LocalStorage('./config');
const jsforce = require('jsforce');

let  conn;

let getConnectionParams = function() {
    return {
        instanceUrl: lcStorage.getItem('instanceUrl'),
        accessToken: lcStorage.getItem('accessToken'),
        version: lcStorage.getItem('refreshToken')
    }
}

let getConnection = function(connectionParams) {
    //localStorage.clear();
    if (conn != null) return conn;

    let instanceUrl = lcStorage.getItem('instanceUrl');
    let accessToken = lcStorage.getItem('accessToken');

    if (instanceUrl !== '' && instanceUrl !== null && accessToken !== '' && accessToken !== null) {
        return new jsforce.Connection(
            (connectionParams == null) ? getConnectionParams() : connectionParams
        );
    }

    return null;
}

module.exports.getConnection = getConnection;
module.exports.getConnectionParams = getConnectionParams;