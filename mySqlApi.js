const mysql = require("mysql");

const mySqlApi = class {
  constructor() {
    // connect with database
    this.con = mysql.createConnection({
      host: "db4free.net",
      user: "vishal253",
      password: "*3GSChmWhh67kYQ",
      database: "datadb253",
    });
    s;
    // class var to store query result
    this.result = null;
    this.connect();
  }

  // fun: to connect to database
  connect() {
    this.con.connect((err) => {
      if (err) throw err;
    });
    console.log("connected to database.");
  }

  // fun: to execute query and return result through promise
  executeQuery(query) {
    return new Promise((resolve, reject) => {
      // execute query
      try {
        this.con.query(query, function (err, result, fields) {
          if (err) reject(err);
          else resolve(result);
        });
      } catch (err) {
        console.log("mysqlApi executeQuery error: ", err);
      }
    });
  }

  // fun: to close connection
  closeConnection() {
    this.con.end(function (err) {
      if (err) {
        return console.log("error:" + err.message);
      }
      console.log("database connection closed.");
    });
  }
};

// export module as mySqlApi object
module.exports.mySqlApi = new mySqlApi();
