const express = require('express');
const { routeList } = require('./src/routes/router.js')
const dotenv = require('dotenv')
//initialize knex
const knexConfig = require('./db/knexfile');
const knex = require('knex')(knexConfig['development'])

const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  }));

dotenv.config();

let port = process.env.PORT || 3000;

app.use(express.json())
app.use(routeList);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


