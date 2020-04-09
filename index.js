const inquirer = require('inquirer')

const mysql = require('mysql')
const consoleTable = require('console.table')

const questions = require('./question')



const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employeeDB'
});

connection.connect(err => {
    if (err) throw err;
})

userPrompt()
async function userPrompt() {
    const results = await inquirer.prompt(questions.prompts);
    switch (results.prompts) {
        case 'View all employees':
            viewAllEmployees();
            break;

        case 'View all employees by department':
            viewAllEmployeesByDepartment();
            break;

        case 'View all employees by manager':
            viewAllEmployeesByManager();
            break;

        case 'Add an employee':
            addEmployee();
            break;

        case 'Remove an employee':
            removeEmployee();
            break;

        case 'Update employee role':
            updateEmployeeRole();
            break;

        case 'Update employee manager':
            updateEmployeeManager();
            break;

        case 'View all roles':
            viewAllRoles();
            break;

        case 'Add role':
            addRole();
            break;

        case 'Remove role':
            removeRole();
            break;

        default:
            connection.end()
            break;
    }
}

function viewAllEmployees() {
    connection
        .query(`SELECT employee.employeeID, employee.firstName, employee.lastName, department.departmentName, role.title, role.salary
        FROM employee
        LEFT JOIN role ON employee.employeeRole = role.roleID
        LEFT JOIN department ON role.departmentId = department.departmentID
        ORDER BY employee.employeeID`, (err, res) => {

            console.table(res)
            if (err) throw err;
            userPrompt()
        });
}

function viewAllEmployeesByDepartment() {
    const sqlList = `SELECT * FROM department`
    connection.query(sqlList, function (err, result) {
        if (err) {
            console.log(err)
        } else {
            let question = [{
                type: "list",
                message: "Which department would you like to view?",
                name: "department",
                choices: result.map(result => result.departmentName)
            }]
            inquirer
                .prompt(question)
                .then(res => {
                    const query = `SELECT employee.employeeID, employee.firstName, employee.lastName, department.departmentName, role.title, role.salary
                            FROM employee
                            LEFT JOIN role ON employee.employeeRole = role.roleID
                            LEFT JOIN department ON role.departmentID = department.departmentID
                            WHERE department.departmentName = "${res.department}"
                            ORDER BY employee.employeeID ASC`
                    connection.query(query, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            console.table(result)
                            userPrompt()
                        }
                    })
                })
        }
    })
}

function addEmployee() {
    connection
        .query(`SELECT * FROM employee`, (err, results) => {
            if (err) throw err

            inquirer
                .prompt([
                    {
                        name: 'firstName',
                        type: 'input',
                        message: 'Enter the first name of the new employee'
                    },
                    {
                        name: 'lastName',
                        type: 'input',
                        message: 'Enter the last name of the new employee'
                    },
                    {
                        name: 'roleID',
                        type: 'number',
                        message: `Enter the new employee\'s role id 
                        (1 = Sales Lead, 2 = Sales Person, 3 = Lead Engineer, 4 = Software Engineer, 5 = Accountant, 6 = Legal Team Lead, 7 = Lawyer)
                        `
                    }
                ])
                .then((res) => {
                    let query = `INSERT INTO employee SET ?`
                    const values = {
                        firstName: res.firstName,
                        lastName: res.lastName,
                        employeeRole: res.roleID,

                    }
                    connection.query(query, values, (err) => {
                        if (err) throw err;
                        console.log('New employee added!')
                        console.table(res)
                        userPrompt();
                    })

                })
        }
        )
}


function removeEmployee() {
    connection
        .query(`SELECT * FROM employee`, (err) => {
            if (err) throw err

            inquirer
                .prompt([
                    {
                        name: 'firstName',
                        type: 'input',
                        message: 'Enter the first name of the employee you would like to remove'
                    },
                    {
                        name: 'lastName',
                        type: 'input',
                        message: 'Enter the last name of the employee you would like to remove'
                    },

                ])
                .then((res) => {
                    let query = `DELETE FROM employee WHERE ? `
                    const values = {
                        firstName: res.firstName,
                        lastName: res.lastName
                    }
                    connection.query(query, values, (err) => {
                        if (err) throw err;
                        console.log('Empoyee removed!')
                        console.table(res)
                        userPrompt();
                    })
                    // console.log(res)
                })
        }
        )
}

function updateEmployeeRole() {
    connection.query(`SELECT * FROM employee`, err => {
        inquirer.prompt([
            {
                name: ''
            }
        ])
    })
}


function viewAllRoles() {
    connection.query(`SELECT title FROM role`, (err, res) => {
        console.table(res)
        if (err) throw err;
        userPrompt();
    })
}

function addRole() {
    connection.query(`SELECT * FROM role`, (err, res) => {
        if (err) throw err

        inquirer
            .prompt([
                {
                    name: 'newRoleTitle',
                    type: 'input',
                    message: 'Enter the the of the role you would like to add'
                },
                {
                    name: 'newRoleID',
                    type: 'number',
                    message: 'Enter the ID you would like to give this role.  Make sure the ID is not being used for another role'
                },
                {
                    name: 'newRoleSalary',
                    type: 'number',
                    message: 'Enter the salary of the new role'
                }
            ])
            .then((res) => {
                let query = `INSERT INTO role SET ?`
                const values = {
                    title: res.newRoleTitle,
                    roleID: res.newRole,
                    salary: res.newRoleSalary
                }
                connection.query(query, values, (err) => {
                    if (err) throw err
                    console.log('New role added!')
                    console.table(res)
                    userPrompt();
                })
            }
            )
    })
}