const PORT = process.env.PORT ?? 8000; //receive our port or set default 8000

const express = require('express')
const cors = require('cors')
const app = express()
const pool = require('./db')
app.use(cors())
app.get('/', (req,res)=>{
    res.send('hello something')
})


//get all todos
app.get('/todos/:userEmail', async (req, res)=>{
    try{
        const email = req.params.userEmail;
        const todos = await pool.query(`SELECT * FROM todos WHERE user_email=$1`, [email]);
        res.json(todos.rows)
    }catch (error){
        console.error(error)
    }
})
app.listen(PORT, ()=>console.log(`Server Running on PORT ${PORT}`))