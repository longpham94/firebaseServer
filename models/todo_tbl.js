var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'hitachi',
  database : 'online',
  port     :  3306
});
var users = [];
connection.connect();
exports.read = function(trip_id){
  return new Promise(async function (fulfill, reject){
    var user = '1234';
    await connection.query('SELECT * from todo where trip_id = "' + trip_id + '"', function (err, rows, fields) {
      if (err) throw err
      if (rows.length > 0){
        console.log('The user is: ', rows[0].status)
        fulfill({"status": 0, "message": "OK", "todoList": rows});
      }
      else fulfill({"status": 1, "message": "No todo for this trip"});
    })
  })
}

exports.insert = function(tripId, name, des){
  return new Promise(async function (fulfill, reject){
    await connection.query('INSERT into todo (trip_id, name, description, status) values ("' + tripId + '", "'+ name +'", "'+ des +'", "1")', function (err, rows, fields) {
      if (err) throw err
      console.log("Done");
      fulfill({"message": "done"});
    })
  })
}
