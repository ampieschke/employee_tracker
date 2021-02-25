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
      if (answer.todo === "View") {
        runShowtable();
      } else if (answer.todo === "Add") {
        runAdd();
      } else if (answer.todo === "Update") {
        runUpdate();
      }
    });
};

const runShowtable = () => {
  console.log("Table Coming Soon!");
};

const runAdd = () => {
  inquirer
    .prompt({
      type: "list",
      name: "addwhat",
      message: "What would you like to add?",
      choices: ["Employee", "Department", "Role"],
    })
    .then((answer) => {
      console.log(answer);
      if (answer.addwhat === "Employee") {
        addEmp();
      } else if (answer.addwhat === "Department") {
        addDept();
      } else if (answer.addwhat === "Role") {
        addRole();
      }
    });
};

const addEmp = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstname",
        message: "What is their FIRST NAME?",
      },
      {
        type: "input",
        name: "lastname",
        message: "What is their LAST NAME?",
      },
      {
        type: "list",
        name: "role",
        message: "What is their ROLE ID?",
        choices: [1, 2],
      },
      {
        type: "list",
        name: "manager",
        message: "Who is their MANAGER?",
        choices: ["A", "B"],
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.firstname,
          last_name: answer.lastname,
          role_id: answer.role,
          manager_id: answer.manager,
        },
        (err) => {
          if (err) throw err;
          console.log("Employee Added Successfully!");

          asktocontinue();
        }
      );
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
