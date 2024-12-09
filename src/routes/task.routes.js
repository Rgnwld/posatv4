const express = require('express')
//initialize knex
const knexConfig = require('../../db/knexfile');
const knex = require('knex')(knexConfig['development'])

const taskRoutes = express.Router();

taskRoutes.get('/task', (req, res) => {
    knex('task')
        .select({
            title: 'title',
            category: 'category'
        })
        .then((task) => {
            return res.json(task);
        })
        .catch((err) => {
            console.error(err);
            return res.json({ success: false, message: 'An error occurred, please try again later.' });
        })
})

taskRoutes.get('/task/:taskid', (req, res) => {
    knex('task').select('title').from('task').where('id', req.params.taskid).then((sql) => {
        console.log(sql)
        res.send(sql)
    }).catch((err) => {
        console.log(err)
        res.send('Error')
    });
})

taskRoutes.post('/task', async (req, res) => {
    knex('task').insert({ title: req.body.title, category: req.body.category, status: req.body.status }).then((sql) => {
        console.log(sql)
        res.send(sql)
    }).catch((err) => {
        console.log(err)
        res.send('Error')
    });

})

taskRoutes.put('/task/:taskid', async (req, res) => {
    knex('task').where({ id: req.params.taskid }).update(
        {
            title: req.body.title,
            category: req.body.category,
            status: req.body.status
        },
        ['id', 'title', 'category']
    ).then((sql) => {
        console.log(sql)
        res.send(sql)
    }).catch((err) => {
        console.log(err)
        res.send('Error')
    });
})

taskRoutes.delete('/task/:taskid', async (req, res) => {
    knex('task').where('id', req.params.taskid).del().then((sql) => {
        console.log(sql)
        res.send('Removed')
    }).catch((err) => {
        console.log(err)
        res.send('Error')
    });
})



module.exports = {
    taskRoutes
}

