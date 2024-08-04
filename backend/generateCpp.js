const fs = require('fs');
const path = require('path');
const {exec} = require('child_process');

const outputDir = path.join(__dirname,"output");

const generateCppOutput = (filepath)=>{
    const jobId = path.basename(filepath);
    const outputFile = jobId.split('.')[0]+'.exe';
    const outputPath = path.join(outputDir,outputFile);
    
    // const command = `g++ ${filepath} -o ${outputPath} && cd ${outputPath} && .\\${outputFile}`;
    if (!fs.existsSync(outputDir)){
        fs.mkdirSync(outputDir,{recursive:true})
    }
    
    return new Promise((resolve,reject)=>{
        exec( 
            `g++ ${filepath} -o ${outputPath} && cd ${outputDir} && .\\${outputFile}`,
            (error,stdout,stderr)=>{
                if (error){
                    reject({error})
                }
                if (stderr){
                    reject({stderr})
                }
                resolve(stdout)
        })
    })

    
}
module.exports = {generateCppOutput};







// another method (first compile and then run )


    // return new Promise((resolve, reject) => {
    //     // Compile step
    //     const compileCommand = `g++ "${filepath}" -o "${outputPath}"`;
        
    //     exec(compileCommand, (compileError, compileStdout, compileStderr) => {
    //         if (compileError) {
    //             console.error('Compilation error:', compileError);
    //             return reject({ error: compileError });
    //         }
    //         if (compileStderr) {
    //             console.error('Compilation stderr:', compileStderr);
    //             return reject({ stderr: compileStderr });
    //         }
            
    //         // Execution step
    //         const runCommand = `"${outputPath}"`;
            
    //         exec(runCommand, (runError, runStdout, runStderr) => {
    //             if (runError) {
    //                 console.error('Execution error:', runError);
    //                 return reject({ error: runError });
    //             }
    //             if (runStderr) {
    //                 console.error('Execution stderr:', runStderr);
    //                 return reject({ stderr: runStderr });
    //             }
    //             resolve(runStdout);
    //         });
    //     });
    // });