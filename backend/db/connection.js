let mongose=require('mongoose');
let connection=mongose.connect('mongodb+srv://ankurEcommerse:Ankur123@cluster0.sgwwiml.mongodb.net/Ecommerse?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log('db connect');
}).catch(()=>{
    console.log('db not connect');
})

module.exports= connection;