const inquirer = require('inquirer');
const db = require('./db/connection.js')


const mainMenu = () => {
    inquirer.prompt([
        {
            name: 'choice',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['Add Department', 'Add Role', 'Add Employee', 'View Departments', 'View Roles', 'View Employees',]
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
            }
        }) 
}

const addDepartment = () => {
    inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'What is the name of the department that you would like to add?',
        }
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

const addRole = () => {

}

const addEmployee = () => {

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


mainMenu();