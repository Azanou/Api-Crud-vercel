require('dotenv').config();



const express = require('express')
const mongoose = require('mongoose')

//on importe nos routes

const tasksRouter = require('./routes/tasks')


//on initialise notre application express

const app=express()
const PORT = process.env.PORT || 3000;

app.use(express.json())


//connection a mongoDB

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connecter a mongoDB atlas, tout s'est bien passer")
    }catch(error){
        console.error("ca na pas marcher : " , error.message)
        process.exit(1)
    }
}

//quelques routes 

app.get('/', (req, res) => {
    res.send("Bonjour , bienvenue dans notre API de cuisine");
})



//on utilise toutes nos routes  definis dans  taskRouter
app.use('/api/v1/tasks', tasksRouter)


//on demarre le serveur

const start = async () => {
    try{
        await connectDB();
        app.listen(PORT, ()=>{
            console.log('Notre API de cuisine ecoute sur le port:', {PORT});
        })
    }catch(error){
        console.log(error)
    }
}

start();