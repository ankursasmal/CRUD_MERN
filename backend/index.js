require('dotenv').config();
const path = require('path');
let express=require('express');
let app=express();
let route=require('./route/allRoute');
let cookieParser=require('cookie-parser')
let cors=require('cors');
const auth = require('./middleware/auth');
let PORT=process.env.PORT | 3000;

// for cookie hendel
app.use(cookieParser());

app.use(express.json());
      
app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['POST', 'GET','PUT',"DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, 

}));

 app.use(route);


app.listen(PORT,()=>{
    console.log(`server run ${PORT}`)
})
