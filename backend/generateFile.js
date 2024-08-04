const fs = require('fs');
const path = require('path');
const {v4 : uuid} = require('uuid');

const dirCodes = path.join(__dirname,"codes")

const generateFile = (language,code) =>{
    
    if (!fs.existsSync(dirCodes)){
        fs.mkdirSync(dirCodes,{recursive:true})
    }
    const jobId = uuid();
    let filename;
    
    if (language === 'java') {
        // Extract the public class name from the Java code
        const classMatch = code.match(/public\s+class\s+(\w+)/);
        if (classMatch && classMatch[1]) {
            filename = `${classMatch[1]}.java`;
        } else {
            throw new Error("No public class found in Java code");
        }
    } else {
        filename = `${jobId}.${language}`;
    }

    const filepath = path.join(dirCodes,filename);

    fs.writeFileSync(filepath,code);
    
    return filepath;

}

module.exports = {generateFile}