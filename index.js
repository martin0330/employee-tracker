const inquirer = require('inquirer');
const db = require('./db/connection.js')


const mainMenu = () => {
    inquirer.prompt([
        {
            name: 'choice',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['Add Department', 'Add Role', 'Add Employee', 'View Departments', 'View Roles', 'View Employees','Update Employee', ]
        },
    ])
        .then(answer => {
            if (answer.choice === 'Add Department') {
                addDepartment();
            } else if (answer.choice === 'Add Role') {
                addRole();
            } else if (answer.choice === 'Add Employee') {
                addEmployee();
            } else if (answer.choice === 'View Departments') {
                viewDepartments();
            } else if (answer.choice === 'View Roles') {
                viewRoles();
            } else if (answer.choice === 'View Employees') {
                viewEmployees();
            } else if (answer.choice === 'Update Employee') {
                updateEmployee();
            } else {
                return;
            }
        }) 
}

// add department function and questions
const addDepartment = () => {
    inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'What is the name of the department that you would like to add?',
        },
        {
            name:'id',
            type: 'input',
            message: 'What is the department ID?',
        },
    ])
        .then(answer => {
    
            let query = db.query(
                "INSERT INTO department SET ?",
                {
                    name: answer.name
                },
                function (err, res) {
                    console.log(res.affectedRows + " department added!\n");
                    mainMenu();
                }
            );
        })
}

// add role function and questions
const addRole = () => {
    inquirer.prompt([
        {
        name:'title',
        type: 'input',
        message: 'What is the job title?',
        },
        {
            name:'department',
            type:'input',
            message: 'What department does the role belong to?',
        },
        {
            name:'salary',
            type:'input',
            message:'What is the salary of the role?',
        },
    ])
        .then(answer => {
            let query = db.query(
                "INSERT INTO roles SET ?",
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department
                },
                function (err, res) {
                    console.log(res.affectedRows + " role added!\n");
                    mainMenu();
                }
            );
        })
}

//add employee function and questions
const addEmployee = () => {
    inquirer.prompt([
        {
            name: 'first',
            type: 'input',
            message: 'What is the employees first name?',
        },
        {
            name: 'last',
            type: 'input',
            message: 'What is the employees last name?',
        },
        {
            name: 'role',
            type: 'input',
            message: 'What is the employees role id?',
        },
        {
            name:'manager',
            type: 'input',
            message: 'What is the employees manager id?'
        },
    ])
    .then(answers => {
        let query = db.query(
            "INSERT INTO employee SET ?",
            {
                first_name: answers.first,
                last_name: answers.last,
                role_id: answers.role,
                manager_id: answers.manager,
            },
            function (err, res) {
                console.log(res.affectedRows +  " employee added!\n");
                mainMenu();
            }
        );
    })
}

const updateEmployee = () => {
    inquirer.prompt([
        {
            name: 'id',
            type:'input',
            message: 'What is the employees ID?'
        },
        {
            name: 'first',
            type: 'input',
            message: 'What is the employees new first name?',
        },
        {
            name: 'last',
            type: 'input',
            message: 'What is the employees new last name?',
        },
        {
            name: 'role',
            type: 'input',
            message: 'What is the employees new role id?',
        },
        {
            name:'manager',
            type: 'input',
            message: 'What is the employees new manager id?'
        },
    ])
    .then(answers => {
        let query = db.query(
            "UPDATE employee SET ? WHERE ?",
            [
            {
                first_name: answers.first,
                last_name: answers.last,
                role_id: answers.role,
                manager_id: answers.manager,
            },
            {
                id: answers.id
            },
        ],
            function (err, res) {
                console.log(res.affectedRows +  " employee added!\n");
                mainMenu();
            }
        );
    })
}

const viewDepartments = () => {
    let query = db.query(
        "SELECT * FROM department",
        function (err, res) {
            console.table(res);
            mainMenu();
        }
    );
}

const viewRoles = () => {
    let query = db.query(
        "SELECT * FROM roles",
        function (err, res) {
            console.table(res);
            mainMenu();
        }
    );
};

const viewEmployees = () => {
    let query = db.query(
        "SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN roles on employee.role_id = roles.id LEFT JOIN department on roles.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;",
        function (err, res) {
            console.table(res);
            mainMenu();
        }
    );
};


mainMenu();