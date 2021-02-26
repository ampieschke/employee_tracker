const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Bluesbro1!",
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
        choices: [1, 2],
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.firstname,
          last_name: answer.lastname,
          role_id: answer.role || 1,
          manager_id: answer.manager || 0,
        },
        (err) => {
          if (err) throw err;
          console.log("Employee Added Successfully!");

          asktocontinue();
        }
      );
    });
};

const addDept = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "deptname",
        message: "What is the NAME?",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO department SET ?",
        {
          deptname: answer.deptname,
        },
        (err) => {
          if (err) throw err;
          console.log("Department Added Successfully!");

          asktocontinue();
        }
      );
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "rolename",
        message: "What is the ROLE NAME?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the ROLE SALARY?",
      },
      {
        type: "input",
        name: "deptid",
        message: "What is the DEPARTMENT ID?",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO roles SET ?",
        {
          rolename: answer.rolename,
        },
        (err) => {
          if (err) throw err;
          console.log("Role Added Successfully!");

          asktocontinue();
        }
      );
    });
};

const runUpdate = () => {
  inquirer.prompt({});
};

const asktocontinue = () => {
  inquirer
    .prompt([
      {
        type: "confirm",
        message: "Do you want to do more?",
        name: "continue",
      },
    ])
    .then((res) => {
      if (res.continue) {
        start();
      } else {
        console.log("Done");
        connection.end();
      }
    })
    .catch((err) => console.error(err));
};

connection.connect((err) => {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});
