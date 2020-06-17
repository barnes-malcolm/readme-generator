const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter your project title.',
        },
        {
            type: 'input',
            name: 'description',
            message: 'Enter a description.',
        },
        {
            type: 'input',
            name: 'contents',
            message: 'Enter table of contents.',
        },
        {
            type: 'input',
            name: 'installation',
            message: 'Enter installation instructions.',
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Enter usage information.',
        },
        {
            type: 'input',
            name: 'license',
            message: 'Enter your license(s).',
        },
        {
            type: 'input',
            name: 'contribution',
            message: 'Enter contribution guidelines.',
        },
        {
            type: 'input',
            name: 'tests',
            message: 'Enter testing information.',
        },
        {
            type: 'input',
            name: 'questions',
            message: 'Enter your questions.',
        },
    ]);
}

function generateHTML(answers) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
        <link rel="stylesheet" href="./style.css" type="text/css">
        <title>README.md Generator</title>
    </head>
    <body>
        <div class="container">
            <div class="card">
                <div class="card-body">
                    <h1 class="display-4">${answers.title}</h1>
                    <p class="lead">This application generates a README file for your latest project.</p>
                    <h3>Licenses <span class="badge badge-secondary">GitHub Badge</span></h3>
                    <ul class="list-group">
                        <li class="list-group-item heading">Description</li>
                        <li class="list-group-item">${answers.description}</li>
                        <li class="list-group-item heading">Table of Contents</li>
                        <li class="list-group-item">${answers.contents}</li>
                        <li class="list-group-item heading">Installation</li>
                        <li class="list-group-item">${answers.installation}</li>
                        <li class="list-group-item heading">Usage</li>
                        <li class="list-group-item">${answers.usage}</li>
                        <li class="list-group-item heading">License</li>
                        <li class="list-group-item">${answers.license}</li>
                        <li class="list-group-item heading">Contributing</li>
                        <li class="list-group-item">${answers.contribution}</li>
                        <li class="list-group-item heading">Tests</li>
                        <li class="list-group-item">${answers.tests}</li>
                        <li class="list-group-item heading">Questions</li>
                        <li class="list-group-item">${answers.questions}</li>
                      </ul>
                </div>
              </div>
        </div>      
    </body>
    </html>`;
}

async function init() {
    console.log('hi');
    try {
        const answers = await promptUser();

        const html = generateHTML(answers);

        await writeFileAsync('index.html', html);

        console.log('Successfully wrote to index.html');
    } catch (err) {
        console.log(err);
    }
}

init();