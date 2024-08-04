const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const {dbconnection} = require('./database/db.js');
const authRouter = require('./routers/authRouter.js');
const cookieparser = require('cookie-parser') 
const {generateFile} = require('./generateFile.js')

const {generateCppOutput} = require('./generateCpp.js')
const {generatePyOutput} = require('./generatePy.js')
const {generateJavaOutput} = require('./generateJava.js')

const cors = require('cors');
const port =  process.env.PORT || 8000;



app.use(cors());

app.use(express.static('public'));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());


app.use('/auth',authRouter)

//establsih database connection
dbconnection();

// routes
app.get('/',(req,res)=>{
    res.send('Hello from online judge')
})



app.post('/run',async (req,res)=>{
    const {language='cpp',code} = req.body;
    if (code == 'undefined'){
        res.status(400).json({error:"No code provided"})
    }
    try {
        const filepath = generateFile(language,code);
        let output;
        if (language === 'cpp'){
            output = await generateCppOutput(filepath);
        }
        else if (language === 'py'){
            try {
                output = await generatePyOutput(filepath);
                console.log("Python output:", output); // For debugging
            } catch (pyError) {
                console.error("Python execution error:", pyError);
                return res.status(500).json({ error: "Python execution failed", details: pyError });
            }
        }
        else if (language === 'java'){
            try {
                output = await generateJavaOutput(filepath);
                console.log("Java output:", output);
            } catch (javaError) {
                console.error("Java execution error:", javaError);
                return res.status(500).json({ error: "Java execution failed", details: javaError });
            }
        }
        else {
            return res.status(400).json({ error: "Unsupported language" });
        }
        // else if (language === 'js'){
        //     output = await generateJsOutput(filepath);
        // }
        // else if (language === 'c'){
        //     output = await generateCOutput(filepath);
        // }
        // else if (language === 'php'){
        //     output = await generatePhpOutput(filepath);
        // }
        // else if (language === 'go'){
        //     output = await generateGoOutput(filepath);
        // }
        // else if (language === 'rust'){
        //     output = await generateRustOutput(filepath);
        // }
        // else if (language === 'kotlin'){
        //     output = await generateKotlinOutput(filepath);
        // }
        // else if (language === 'swift'){
        //     output = await generateSwiftOutput(filepath );
        // }
        res.status(200).json({filepath,output})

    } catch (error) {
        console.error('Error in /run route:', error);
        res.status(500).json({ error: error.message || 'Internal Server Error', details: error });
    }
    
})  


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
}) 