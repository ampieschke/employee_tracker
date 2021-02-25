const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employeetracker",
});

const start = () => {
  inquirer
    .prompt({
      type: "list",
      name: "todo",
      message: "What would you like to do?",
      choices: ["View", "Add", "Update"],
    })
    .then((answer) => {
      console.log(answer);
      if (answer === "View") {
        runShowtable();
      } else if (answer === "Add") {
        runAdd();
      } else if (answer === "Update") {
        runUpdate();
      }
    });
};

const runShowtable = () => {
  inquirer.prompt({});
};

const runAdd = () => {
  inquirer
    .prompt({
      type: "list",
      name: "addwhat",
      message: "What would you like to add?",
      choices: ["Employee", "Department", "Roll"],
    })
    .then((answer) => {
      console.log(answer);
      if (answer === "View") {
        runShowtable();
      } else if (answer === "Add") {
        runAdd();
      } else if (answer === "Update") {
        runUpdate();
      }
    });
};

const runUpdate = () => {
  inquirer.prompt({});
};

// connect to the mysql server and sql database
// connection.connect((err) => {
//   if (err) throw err;
//   // run the start function after the connection is made to prompt the user
//   start();
// });

start();
