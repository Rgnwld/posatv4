const express = require('express')
//initialize knex
const knexConfig = require('../../db/knexfile');
const knex = require('knex')(knexConfig['development'])

const categoryRoutes = express.Router();

categoryRoutes.get('/category', (req, res) => {
    knex('category')
        .select({
            title: 'title'
        })
        .then((category) => {
            return res.json(category);
        })
        .catch((err) => {
            console.error(err);
            return res.json({ success: false, message: 'An error occurred, please try again later.' });
        })
})

categoryRoutes.get('/category/:categoryid', (req, res) => {
    knex('category').select('id', 'title').from('task').where('category', req.params.categoryid).then((sql) => {
        console.log(sql)
        res.send({tasks: sql})
    }).catch((err) => {
        console.log(err)
        res.send('Error')
    });
})

categoryRoutes.post('/category', async (req, res) => {
    knex('category').insert({ title: req.body.title }).then((sql) => {
        console.log(sql)
        res.send(sql)
    }).catch((err) => {
        console.log(err)
        res.send('Error')
    });

})

categoryRoutes.put('/category/:categoryid', async (req, res) => {
    knex('category').where({ id: req.params.categoryid }).update(
        {
            title: req.body.title,
        },
        ['id', 'title']
    ).then((sql) => {
        console.log(sql)
        res.send(sql)
    }).catch((err) => {
        console.log(err)
        res.send('Error')
    });
})

categoryRoutes.delete('/category/:categoryid', async (req, res) => {
    knex('category').where('id', req.params.categoryid).del().then((sql) => {
        console.log(sql)
        res.send('Removed')
    }).catch((err) => {
        console.log(err)
        res.send('Error')
    });
})



module.exports = {
    categoryRoutes
}

