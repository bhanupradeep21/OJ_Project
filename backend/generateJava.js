const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const outputDir = path.resolve(__dirname, "output");

const generateJavaOutput = (filepath) => {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const filename = path.basename(filepath, '.java');
    const classOutputDir = path.dirname(filepath);

    return new Promise((resolve, reject) => {
        // Compile Java file
        exec(`javac "${filepath}"`, (compileError, compileStdout, compileStderr) => {
            if (compileError) {
                console.error('Compilation error:', compileError);
                console.error('Compilation stderr:', compileStderr);
                return reject({ error: compileError, stderr: compileStderr });
            }
            if (compileStderr) {
                console.error('Compilation stderr:', compileStderr);
            }

            // Run Java class
            exec(`java -cp "${classOutputDir}" ${filename}`, (runError, runStdout, runStderr) => {
                if (runError) {
                    console.error('Execution error:', runError);
                    console.error('Execution stderr:', runStderr);
                    return reject({ error: runError, stderr: runStderr });
                }
                if (runStderr) {
                    console.error('Execution stderr:', runStderr);
                }
                resolve(runStdout);
            });
        });
    });
};

module.exports = { generateJavaOutput };
