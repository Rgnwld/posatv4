import express from 'express';
import {HashPassword} from './utils/hash'
import { ExecuteSQL } from "./sql.js";
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.get('/user', (req, res) => {
    res.send('Providencie um userId')
})

app.get('/user/:userid', (req, res) => {

    
    res.send("User name: " + r );
})

app.post('/user', async (req, res) => {
    const {username, password} = (req.body)
    await InsertUser(username, HashPassword(password));
    res.send("User Created");
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

