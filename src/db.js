const mysql = require("mysql");

//Create singleton database object
const db = function() {
  let connection;

  const initConnection = function() {
    connection = mysql.createConnection({
      host: "localhost",
      user: "BasicApp",
      password: "$Password$123$",
      database: "BasicApp",
      multipleStatements: true,
    });
  };

  const startConnection = function() {
    connection.connect((exception)=>{
      if (exception) {
        console.log(exception);
      }
      console.log("MySQL connected.");
    });
  };

  const endConnection = function() {
    connection.end();
    console.log("MySQL disconnected.")
  };

  const init = function() {
    //Instantiate the database connection
    initConnection();

    //Start the database connection
    startConnection();
  };

  this.query = function(sql, callback) {
    //Query the database
    connection.query(sql, (exception, results) => {
      if (exception) {
        throw exception;
      }
      console.log("Command completed successfully.");

      //Return the results
      callback(results);
    });
  };

  this.destroy = function() {
    endConnection();
  };

  //Initialize the database connection
  init();
};

module.exports = db;
