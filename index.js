const inquirer = require('inquirer');
// connection file containing postgres credentials
const connection = require("./DB/connection");
var figlet = require("figlet");

figlet("Employee🖇Manager", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
  startMenu();
});


// function for main menu to begin questions
async function startMenu(){
  const primaryQuestion = await inquirer.prompt([
    {type:"list",
     name: "list_options",
     message:"What would you like to do?",
     choices:['View All Employees', 
              'Add Employee', 
              'Update Employee Role', 
              'View All Roles', 
              'Add Role', 
              'View All Departments', 
              'Add Department',
              'Delete an Employee record', 
              'End Session']
     },
  ]);

 
  if (primaryQuestion.list_options === 'View All Employees'){
    viewEmployees();
  };

  if (primaryQuestion.list_options === 'View All Roles'){
    viewRoles();
  };

  if (primaryQuestion.list_options === 'View All Departments'){
    viewDepartment();
  };

  if (primaryQuestion.list_options === 'Add Employee'){
    addEmployees();
  };

  if (primaryQuestion.list_options === 'Add Role'){
   addRole();
  };

  if (primaryQuestion.list_options === 'Add Department'){
    addDepartment();
   };

  if (primaryQuestion.list_options === 'Update Employee Role'){
    updateRole();
   };

   if (primaryQuestion.list_options === 'Delete an Employee record'){
   deleteEmployee();
   };
   // Close the connection to end session
   if (primaryQuestion.list_options === 'End Session'){
    connection.end(); 
   };
  
};

  // function that joins the table to view employee information
 function viewEmployees () {
    // -- VIEW ALL EMPLOYEEs
   const query= `SELECT 
                     employees.id, 
                     employees.first_name, 
                     employees.last_name, 
                     CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name, 
                     roles.salary,
                     departments.name AS department_name, 
                     roles.title AS role_name
                 FROM employees
                 JOIN departments ON employees.department_id = departments.id
                 JOIN roles ON employees.role_id = roles.id
                 LEFT JOIN employees AS manager ON employees.manager_id = manager.id`;
   connection.query(query, (err,{rows}) => {
      if (err) throw err;
      console.table(rows);
      startMenu();
  });

};
// function to display table joining roles and department tables
const viewRoles = ()=> {
const query =`
SELECT 
    roles.id, 
    roles.title, 
    roles.salary, 
    departments.name AS department_name
FROM roles
INNER JOIN departments ON departments.id = roles.department_id;`;
connection.query(query, (err,{rows}) => {
  if (err) throw err;
  console.table(rows);
  startMenu();
});
};

// function to display department
const viewDepartment = ()=> {
  const query =`SELECT * FROM departments`;
  connection.query(query, (err,{rows}) => {
    if (err) throw err;
    console.table(rows);
    startMenu();
  });
  };

  // function to display departments from database
const getDepartments = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT name FROM departments';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error querying departments:', err);
        return reject(err);
      }      
      // Map results to an array of department names
      const departments = results.rows.map(row => row.name);
      resolve(departments);
    });
  });
};
// getting role list from database
const getRoles = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT title FROM roles';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error querying roles:', err);
        return reject(err);
      }      
      // Map results to an array of department names
      const roles = results.rows.map(row => row.title);
      resolve(roles);
    });
  });
};

// getting employee names list from database for managers
const getManager = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT first_name, last_name  FROM employees';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error querying roles:', err);
        return reject(err);
      }      
      // Map results to an array of department names
      const managers = results.rows.map(row => `${row.first_name} ${row.last_name}`);
      resolve(managers);
    });
  });
};

  // prompt to add employees
  const addEmployees = () => {
    const addEmp = async () =>{
    try {
    const roles = await getRoles();//get roles
    const departments = await getDepartments(); // Get departments
    const managers = await getManager (); //employee list
    const answers = await inquirer.prompt([
  {type:"input",
    name: "firstName",
    message:"What is the first name of the employee?",
  },  

  {type:"input",
    name: "lastName",
    message:(answers) =>`What is ${answers.firstName}'s last name?`,
  },

  {type:"list",
    name: "role",
    message:(answers) =>`What is ${answers.firstName}'s role?`,
    choices: roles
  },
  {
    type: "list",
    name: "department",
    message: (answers) => `Which department does ${answers.firstName} belong to?`,
    choices: departments,
  },

  {type:"list",
    name: "manager",
    message:(answers) =>`Who is ${answers.firstName}'s manager?`,
    choices: managers,
  },
]);
const query = `
        INSERT INTO employees (first_name, last_name, role_id, manager_id, department_id) 
        VALUES ($1, $2, (SELECT id FROM roles WHERE title = $3), 
               (SELECT id FROM employees WHERE CONCAT(first_name, ' ', last_name) = $4),
               (SELECT id FROM departments WHERE name = $5))
      `;
      connection.query(query, [answers.firstName, answers.lastName, answers.role, answers.manager, answers.department], (err, results) => {
        if (err) {
          console.error('Error adding employee:', err);
        } else {
          console.log(`Employee '${answers.firstName} ${answers.lastName}' added successfully!`);
        }
        startMenu(); // Return to the main menu
      });

    } catch (error) {
      console.error('Error during prompting:', error);
    }
  };

  addEmp(); // Call the addEmp function
};

// promt to add department
const addDepartment=() =>{
inquirer.prompt([
  {type:"input",
    name: "addDept",
    message:"What is the name of the department you would ike to add?",
  },  
])
.then(answer => {
  // Insert the new department into the database
  const query = 'INSERT INTO departments (name) VALUES ($1)';
  connection.query(query, [answer.addDept], (err, results) => {
    if (err) {
      console.error('Error adding department:', err);
    } else {
      console.log(`Department '${answer.addDept}' added successfully!`);
    }
    startMenu()
  });
})
.catch(error => {
  console.error('Error during prompting:', error);
});
};



// updating an existing role with a new one and asigning it to a department
// prompts
function updateRole() {
  const askRoles = async () => {
    try {
      const departments = await getDepartments();
      const roles = await getRoles();
      const role_answers = await inquirer.prompt([
        {
          type: "list",
          name: "oldRole",
          message: "What is the name of the role you would like to update?",
          choices: roles
        },
        {
          type: "input",
          name: "newRole",
          message: (answers) => `What role would you like to update ${answers.oldRole} to?"`,
        },

        {
          type: "list",
          name: "newDept",
          message: (answers) => `Which department does ${answers.newRole} belong to?`,
          choices: departments,
        },
      ]);

    // Update the role in the database
    const query = `UPDATE roles SET title = $1, department_id = (SELECT id FROM departments WHERE name = $2) WHERE title = $3`;
    connection.query(query, [role_answers.newRole, role_answers.newDept, role_answers.oldRole], (err, results) => {
      if (err) {
        console.error('Error adding department:', err);
      } else {
        console.log(`Role '${role_answers.oldRole}' updated to '${role_answers.newRole}' successfully!`);
      }
      startMenu()
    });
  }
  catch(error) {
    console.error('Error during prompting:', error);
  }}
  askRoles();
};




// promt to add role and asigning it to a department
const addRole = () => {
  const askRole = async () =>{
    try {
  const departments = await getDepartments();  
  const answers = await inquirer.prompt([
  {type:"input",
    name: "addRole",
    message:"What is the name of the role?",
  }, 
  
  {type:"input",
    name: "newSalary",
    message:'What is the salary?',
  }, 

  {type:"list",
    name: "newDept",
    message:(answers) =>`Which department does ${answers.addRole} belong to?`,
    choices: departments,
  }, 
])


  // Insert the new role into the database
  const query = `INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, (SELECT id FROM departments WHERE name = $3))`;
  connection.query(query, [answers.addRole, answers.newSalary, answers.newDept], (err, results) => {
    if (err) {
      console.error('Error adding role:', err);
    } else {
      console.log(`Role '${answers.addRole}' added successfully!`);
    }
    startMenu();
  });
} catch(error) {
  console.error('Error during prompting:', error);
}};

askRole();
};

const deleteEmployee = () => {
  const askEmpl = async () =>{
    try {
  const employees = await getManager();  
  const answers = await inquirer.prompt([
  {type:"list",
    name: "deleteEmployee",
    message:"Which employee information would you like to delete?",
    choices: employees,
  },   
])

const deleteQuery = `DELETE FROM employees WHERE CONCAT(first_name, ' ', last_name) = $1`;
connection.query(deleteQuery, [answers.deleteEmployee], (err, results) => {
  if (err) {
    console.error('Error deleting employee:', err);
  } else {
    console.log(`'${answers.deleteEmployee}' removed successfully!`);
  }
  startMenu();
});
} catch(error) {
console.error('Employee nor found:', error);
}};

askEmpl();
};
