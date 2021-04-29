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
    //Closes connection once all queued queries are complete,
    // as opposed to connection.destroy()
    connection.end(err=>console.error(`Failed to disconnect from ${config.vendor}.`));
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
    if (!params instanceof Array) params = [params];
    return new Promise((resolve, reject) => {
      connection.query(sql, params, (err, response, fields) => {
        if (err) return reject(`Error ${err.errno}, ${err.code}:\r\n${err.sqlMessage}`);
        const results = (response[0] instanceof Array && response[0].length ===1 ? response[0][0] : response[0]);
        resolve(results, fields);
      });
    });
  };

  this.call = function(routine, params) {
    if (!params instanceof Array) params = [params];
    let numOfParams = (params instanceof Array ? params.length : (params ? 1 : 0));
    return new Promise((resolve, reject) => {
      connection.query(`CALL ${routine}(${Array(numOfParams).fill("?").join(",")});`, params, (err, response, fields) => {
        if (err) return reject(`Error ${err.errno}, ${err.code}:\r\n${err.sqlMessage}`);
        const results = (response[0] instanceof Array && response[0].length ===1 ? response[0][0] : response[0]);
        const messages = response[1];
        resolve(results, messages, fields);
      });
    });
  };

  this.destroy = function() {
    disconnect();
  };
};

module.exports = new Database();
