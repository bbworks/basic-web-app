//Import modules
const mysql = require("mysql");
const util = require("util");
const dbConfig = require("./secret/db.config");

//Initialize variables
const environment = "dev"; //process.env.NODE_ENV || "dev";
const config = dbConfig[environment];

//Create singleton object
const Database = function() {
  let connection;

  const connect = function() {
    console.log(`Connecting to ${config.vendor}...`);

    connection = mysql.createConnection({
      host: config.host,
      user: config.user,
      password: config.password,
      database: config.database,
      multipleStatements: config.multipleStatements,
    });

    connection.connect((err)=>{
      if (err) {
        console.error(`Failed to connect to ${config.vendor} database ${config.database} user ${config.user} on port ${config.port}.`);
        throw err;
      }
      console.log(`Connected to ${config.vendor} database ${config.database} user ${config.user} on port ${config.port}, thread_id ${connection.threadId}.`);
    });
  };

  const disconnect = function() {
    connection.end();
    console.log(`Disconnected from ${config.vendor}.`);
  };

  //Initialize the database connection
  this.init = function() {
    //If we have already instantiated our database connection, skip
    if (connection) return

    //Instantiate the database connection
    connect();
  };

  this.query = function(sql, params) {
    return new Promise((resolve, reject) => {
      //Query the database
      connection.query(sql, params, (err, results) => {
        if (err) reject(err);
        //console.log("Command completed successfully.");
        resolve(results);
      });
    });
  };

  this.destroy = function() {
    disconnect();
  };
};

module.exports = new Database();
