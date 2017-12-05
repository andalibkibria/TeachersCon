// Set up MySQL connection.
var mysql = require("mysql");

var connection;
if(process.env.JAWSDB_URL) {
    //Heroku deployment
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    //local host
    connection = mysql.createConnection({
        port: 8080,
        host: "localhost",
        user: "root",
        password: "1234",
        database: "teachercon_DB"
    });
}

// Make connection.
connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

var del = connection._protocol._delegateError;
connection._protocol._delegateError = function(err, sequence){
    if (err.fatal) {
        console.trace('fatal error: ' + err.message);
    }
    return del.call(this, err, sequence);
};





// Export connection for our ORM to use.
module.exports = connection;
