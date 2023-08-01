const PORT = process.env.PORT ?? 8000; //receive our port or set default 8000
const express = require('express')
const { v4: uuidv4 } = require('uuid')
const cors = require('cors')
const app = express()
const pool = require('./db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')
const root = path.join(__dirname, '../client', 'build')
app.use(express.static(root));

const {sign} = require("jsonwebtoken");
app.use(cors())
app.use(express.json())


if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname, '../client/build')))
}
//get all todos
app.get('/todos/:userEmail', async (req, res)=>{
    try{
        const email = req.params.userEmail;
        const todos = await pool.query(`SELECT * FROM todos WHERE user_email=$1 ORDER BY date ASC`, [email]);
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

app.post('/signup', async (req, res)=>{
    const {user_email,password} = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    try{
        const newUser = await pool.query(`INSERT INTO users(email, hashed_password) VALUES($1,$2)`, [user_email, hashedPassword]);

        const token = jwt.sign({user_email}, 'secret', {expiresIn: '1hr'})
        res.json({user_email, token})
    }catch (error){
        console.error(error)
        if(error)
            res.json({detail: error.detail})
    }
})
app.post('/login', async (req, res)=>{
    const {user_email, password} = req.body
    try{
        console.log('login before')
        const users = await pool.query(`SELECT * FROM users WHERE email=$1`, [user_email]);
        console.log(users)
        console.log('login after')
        if (!users.rows.length) return res.json({ detail: 'User does not exist!' })
        let success = await bcrypt.compare(password, users.rows[0].hashed_password);
        if (success) {
            const token = jwt.sign({ user_email }, 'secret', { expiresIn: '1hr' })
            res.json({ 'user_email' : users.rows[0].email, token})
        } else {
            res.json({ detail: "Login failed"})
        }

    }catch (error){
        console.error(error)
    }
})

app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
})
app.listen(PORT, ()=>console.log(`Server Running on PORT ${PORT}`))