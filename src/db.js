//Import modules
const mysql = require("mysql");

//Create singleton object
const Database = function() {
  let connection;

  const startConnection = function() {
    connection = mysql.createConnection({
      host: "localhost",
      user: "BasicApp",
      password: "$Password$123$",
      database: "BasicApp",
      multipleStatements: true,
    });

    connection.connect((exception)=>{
      if (exception) throw exception;
      console.log("Database connected.");
    });
  };

  const endConnection = function() {
    connection.end();
    console.log("Database disconnected.")
  };

  //Initialize the database connection
  this.init = function() {
    //If we have already instantiated our database connection, skip
    if (connection) return

    //Instantiate the database connection
    startConnection();
  };

  this.query = function(sql, callback, params) {
    //Query the database
    connection.query(sql, params, (exception, results) => {
      if (exception) throw exception;
      //console.log("Command completed successfully.");

      //Return the results
      callback(results);
    });
  };

  this.destroy = function() {
    endConnection();
  };
};

module.exports = new Database();
