const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
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

//////////////////////////// SHOW STUFF  ///////////////////////////

const runShowtable = () => {
  inquirer
    .prompt({
      type: "list",
      name: "seewhat",
      message: "What would you like to view?",
      choices: ["All Employees", "All Departments", "All Roles"],
    })
    .then((answer) => {
      console.log(answer);
      if (answer.seewhat === "All Employees") {
        seeEmps();
      } else if (answer.seewhat === "All Departments") {
        seeDepts();
      } else if (answer.seewhat === "All Roles") {
        seeRoles();
      }
    });

  const seeEmps = () => {
    const query =
      "SELECT * FROM employee left join roles on employee.role_id = roles.id";
    // query += "FROM roles INNER JOIN ON employee.role_id=roles.id";
    connection.query(query, (err, res) => {
      if (err) throw err;
      const table = cTable.getTable(res);
      console.log(table);
      asktocontinue();
    });
  };
};

const seeDepts = () => {
  const query = "SELECT * FROM department";
  connection.query(query, (err, res) => {
    if (err) throw err;
    const table = cTable.getTable(res);
    console.log(table);
    asktocontinue();
  });
};

const seeRoles = () => {
  const query = "SELECT title, salary FROM roles";
  connection.query(query, (err, res) => {
    if (err) throw err;
    const table = cTable.getTable(res);
    console.log(table);
    asktocontinue();
  });
};

//////////////////////////// ADD STUFF  ///////////////////////////

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

////////////////////////////  ADD EMPLOYEE  ///////////////////////////

const addEmp = () => {
  const query = "SELECT * FROM roles";
  connection.query(query, (err, res) => {
    if (err) throw err;
    const rolChoices = [];
    res.forEach(({ id, title }) => {
      let rol = {
        name: title,
        value: id,
      };
      rolChoices.push(rol);
      console.log(rolChoices);
    });

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
          message: "What is their ROLE?",
          choices: rolChoices,
        },
        {
          type: "list",
          name: "manager",
          message: "Who is their MANAGER?",
          choices: [0, 1, 2],
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
  });
};

////////////////////////////  ADD DEPARTMENT  ///////////////////////////
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

////////////////////////////  ADD ROLE  ///////////////////////////
const addRole = () => {
  const query = "SELECT * FROM department";
  connection.query(query, (err, res) => {
    if (err) throw err;
    const depChoices = [];
    res.forEach(({ id, deptname }) => {
      let dep = {
        name: deptname,
        value: id,
      };
      depChoices.push(dep);
      console.log(depChoices);
    });

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
          type: "list",
          name: "deptid",
          message: "What is the DEPARTMENT ID?",
          choices: depChoices,
        },
      ])
      .then((answer) => {
        connection.query(
          "INSERT INTO roles SET ?",
          {
            title: answer.rolename,
            salary: answer.salary,
            department_id: answer.deptid,
          },
          (err) => {
            if (err) throw err;
            console.log("Role Added Successfully!");

            asktocontinue();
          }
        );
      });
  });
};

////////////////////////////  UPDATE STUFF  ///////////////////////////

const runUpdate = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "update",
        message: "What would you like to update?",
        choices: ["Employee Role", "Employee Manager"],
      },
    ])
    .then((answer) => {
      console.log(answer);
      if (answer.update === "Employee Role") {
        upEmp();
      } else if (answer.update === "Employee Manager") {
        upMan();
      }
    });
};

////////////////////////////  UPDATE EMPLOYEE ROLE  ///////////////////////////

const upEmp = () => {
  const query = "SELECT * FROM employee";
  connection.query(query, (err, res) => {
    if (err) throw err;
    // let roleChoices = [];
    const empChoices = [];
    res.forEach(({ id, first_name, last_name }) => {
      let emp = {
        name: first_name + " " + last_name,
        value: id,
      };
      empChoices.push(emp);
    });
    // res.forEach(({ id, title }) => {
    //   let rol = {
    //     name: title,
    //     value: id,
    //   };
    // });

    inquirer
      .prompt([
        {
          type: "list",
          name: "updateWho",
          message: "Whos role would you like to update?",
          choices: empChoices,
        },
        {
          type: "list",
          name: "roleup",
          message: "What would you like to update their role to?",
          choices: [1, 2, 3], //roleChoices
        },
      ])
      .then((answer) => {
        console.log(answer);
        connection.query(
          "UPDATE employee SET ? WHERE ?",
          [
            {
              role_id: answer.roleup,
            },
            {
              id: answer.updateWho,
            },
          ],
          (err) => {
            if (err) throw err;
            console.log("Role Updated Successfully!");
            asktocontinue();
          }
        );
      });
  });
};

////////////////////////////  UPDATE EMPLOYEE Manger  ///////////////////////////

const upMan = () => {
  const query = "SELECT * FROM employee";
  connection.query(query, (err, res) => {
    if (err) throw err;
    // let roleChoices = [];
    const empChoices = [];
    res.forEach(({ id, first_name, last_name }) => {
      let emp = {
        name: first_name + " " + last_name,
        value: id,
      };
      empChoices.push(emp);
    });
    // res.forEach(({ id, title }) => {
    //   let rol = {
    //     name: title,
    //     value: id,
    //   };
    // });

    inquirer
      .prompt([
        {
          type: "list",
          name: "updateWho",
          message: "Whos Manager would you like to update?",
          choices: empChoices,
        },
        {
          type: "list",
          name: "manup",
          message: "Who would you like to update manager role to?",
          choices: [1, 2, 3], //roleChoices
        },
      ])
      .then((answer) => {
        console.log(answer);
        connection.query(
          "UPDATE employee SET ? WHERE ?",
          [
            {
              role_id: answer.manup,
            },
            {
              id: answer.updateWho,
            },
          ],
          (err) => {
            if (err) throw err;
            console.log("Role Updated Successfully!");
            asktocontinue();
          }
        );
      });
  });
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
  console.log("Welcome to the Employee Database!");
  start();
});
