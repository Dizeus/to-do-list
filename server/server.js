const PORT = process.env.PORT ?? 8000; //receive our port or set default 8000

const express = require('express')
const { v4: uuidv4 } = require('uuid')
const cors = require('cors')
const app = express()
const pool = require('./db')
app.use(cors())
app.use(express.json())
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

app.post('/todos', async (req, res)=>{
    const {user_email, title, progress, date} = req.body
    const id = uuidv4()
    try{
        const newToDo = await pool.query(`INSERT INTO todos(id, user_email,title, progress, date) VALUES($1,$2,$3,$4,$5)`, [id, user_email, title, progress, date]);
        res.json(newToDo)
    }catch (error){
        console.error(error)
    }
})

app.put('/todos/:id', async (req, res)=>{
    try{
        const id = req.params.id;
        const {user_email, title, progress, date} = req.body
        const update = await pool.query(`UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5;`, [user_email, title, progress, date, id]);
        res.json(update)
    }catch (error){
        console.error(error)
    }
})
app.delete('/todos/:id', async (req, res)=>{
    try{
        const id = req.params.id;
        const del = await pool.query(`DELETE FROM todos WHERE id = $1;`, [id]);
        res.json(del)
    }catch (error){
        console.error(error)
    }
})


app.listen(PORT, ()=>console.log(`Server Running on PORT ${PORT}`))