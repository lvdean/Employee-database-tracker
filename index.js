var inquirer = require('inquirer');
// inquirer
//   .prompt([
//     /* Pass your questions in here */
//      {type:"List",
//       name: "List_options",
//       message:"What would you like to do?",
//       choices:['View All Employees', 'Add Employee','Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Depatment']
//      },



//   ])
//   .then((answers) => {
//     // Use user feedback for... whatever!!
//   })
//   .catch((error) => {
//     if (error.isTtyError) {
//       // Prompt couldn't be rendered in the current environment
//     } 
//   });

async function askQuestions(){
  const primaryQuestion = await inquirer.prompt([
    {type:"List",
            name: "List_options",
            message:"What would you like to do?",
            choices:['View All Employees', 'Add Employee','Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Depatment']
           },
  ]);
};

askQuestions()