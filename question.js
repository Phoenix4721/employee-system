const prompts = [
    {
        type: "rawlist",
        name: "prompts",
        message: "What would you like to to?",
        choices: [
            'View all employees',
            'View all employees by department',
            'View all employees by manager',
            'Add an employee',
            'Remove an employee',
            'Update employee role',
            'Update manager role',
            'View all roles',
            'Add role',
            'Remove a role',
            'Exit'
        ]
    }
]



module.exports = { prompts }