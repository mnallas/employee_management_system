const mysql = require("mysql");
const inquirer = require("inquirer");

// function viewMenu() {
//   inquirer
//     .prompt({
//       name: "view",
//       message: "Select Option:",
//       type: "list",
//       choices: ["employee", "roles", "department"],
//     })
//     .then((res) => {
//       func(res.view).then((res) => {
//         console.log(res);
//         mainMenu();
//       });
//     });
// }

function addMenu(func) {
  inquirer
    .prompt([
      {
        name: "firstName",
        message: "enter first name: ",
        type: "input",
      },
      {
        name: "lastName",
        message: "enter last name: ",
        type: "input",
      },
      {
        name: "role",
        message: "Choose your role: ",
        type: "list",
        choices: ["Sales Lead", "Senior Engineer", "Accountant"],
      },
      {
        name: "manager",
        message: "Choose manager: ",
        type: "list",
        choices: ["#", "#", "#"],
      },
    ])
    .then((res) => {
      func(res.search).then((res) => {
        console.log(res);
        mainMenu();
      });
    });
}

function searchMenu(func) {
  inquirer
    .prompt({
      name: "search",
      message: "enter the id you are searching for",
      type: "input",
    })
    .then((res) => {
      func(res.search).then((res) => {
        console.log(res);
        mainMenu();
      });
    });
}
function mainMenu() {
  inquirer
    .prompt([
      {
        name: "mainMenu",
        message: "Where would you like to go?",
        type: "list",
        choices: [
          "View All",
          "View Options",
          "View an Employee",
          "Add Employee",
          "Add Role",
          "Add Department",
          "Delete",
          "Edit",
          "Exit",
        ],
      },
    ])
    .then((res) => {
      switch (res.mainMenu) {
        case "View All":
          readAllEmployee().then((res) => {
            console.log(res);
            mainMenu();
          });
          break;
        case "View Options":
          viewMenu();
          break;
        case "View an Employee":
          searchMenu(findEmployee);
          break;
        case "Add Employee":
          addMenu(addEmployee);
          break;
        case "Delete":
          searchMenu(deleteEmployee);
          break;
        case "Exit":
          connection.end();
          process.exit();
        default:
          break;
      }
    });
}
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employees_db",
});
connection.connect(async (err) => {
  if (err) throw err;
  console.log("We have been connected");
  mainMenu();
});
const findEmployee = (findId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM employee WHERE ?",
      [{ id: findId }],
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
};

const readTodo = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM employee"),
      (err, data) => {
        err ? reject(err) : resolve(data);
      };
  });
};

const readAllEmployee = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, employee.manager_id, department.department_name
	FROM employee 
	INNER JOIN roles
		ON employee.role_id = roles.id
	INNER JOIN department
		ON roles.department_id = department.id`,
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
};
const addEmployee = (newText) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO employee SET ?",
      [{ first_name: newText }],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ msg: "Successfully added!!!" });
        }
      }
    );
  });
};

const deleteEmployee = (findId) => {
  return new Promise((resolve, reject) => {
    connection.query("DELETE FROM employee WHERE ?", [{ id: findId }]),
      (err) => {
        err ? reject(err) : resolve({ msg: "Deleted employee!" });
      };
  });
};
