const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const outputDir = path.join(__dirname, "output");

const generatePyOutput = (filepath) => {

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    return new Promise((resolve, reject) => {
        exec(`python ${filepath}`, (error, stdout, stderr) => {
            if (error) {
                reject({ error });
            }
            if (stderr) {
                reject({ stderr });
            }
            resolve(stdout);
        });
    });
};

module.exports = { generatePyOutput };
