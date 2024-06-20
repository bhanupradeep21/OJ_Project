const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const {dbconnection} = require('./database/db.js');
const authRouter = require('./routers/authRouter.js');

const cors = require('cors');
const port =  process.env.PORT || 8000;
app.use(cors());

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/auth',authRouter)

dbconnection();
app.get('/',(req,res)=>{
    res.send('Hello from online judge')
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})