require('dotenv').config(); // Load environment variables
const { Client } = require('pg');
const inquirer = require('inquirer');

const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
});

client.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});

async function askQuestions() {
    const firstQuestion = await inquirer.prompt([
        {
            type: 'list',
            name: 'color',
            message: 'What is your favorite color?',
            choices: ['Red', 'Blue', 'Green'],
        }
    ]);

    let secondQuestion;
    if (firstQuestion.color === 'Red') {
        secondQuestion = await inquirer.prompt([
            {
                type: 'input',
                name: 'redShade',
                message: 'What shade of red do you like?',
            }
        ]);

        const res = await client.query('SELECT * FROM colors WHERE shade = $1', [secondQuestion.redShade]);
        console.log('Database results:', res.rows);

    } else {
        secondQuestion = await inquirer.prompt([
            {
                type: 'input',
                name: 'otherColor',
                message: 'Why do you like that color?',
            }
        ]);
    }

    console.log(`Your answers:`, firstQuestion, secondQuestion);
}

// Call the function
askQuestions().then(() => {
    client.end(); // Close the database connection when done
}).catch((err) => {
    console.error('Error during the process:', err);
    client.end(); // Ensure the connection is closed in case of an error
});
