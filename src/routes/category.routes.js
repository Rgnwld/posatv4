const express = require('express')
//initialize knex
const knexConfig = require('../../db/knexfile');
const knex = require('knex')(knexConfig['development'])

const categoryRoutes = express.Router();
//#region CRUD functions
async function GetCategory(categoryid) {
    if (categoryid == undefined) {
        throw 'CategoryID not provided.';
    }

    return await knex('category').select('id', 'title').from('category').where('category', categoryid).then((sql) => {
        return sql;
    }).catch((err) => {
        throw 'Category not found.';
    });
}

async function GetCategoryTasks(categoryid) {
    if (categoryid == undefined) {
        throw 'CategoryID not provided.';
    }

    return await knex('category').select('id', 'title').from('task').where('category', categoryid).then((sql) => {
        return { tasks: sql }
    }).catch((err) => {
        throw 'Category not found.';
    });
}

async function CreateCategory(title) {
    if (title == undefined) {
        throw 'Title not provided.'
    }

    return await knex('category').insert({ title: title }).then((sql) => {
        console.log(sql)
        return sql
    }).catch((err) => {
        throw 'Category was not created. Something went wrong';
    });
}

async function UpdateCategory(categoryid, title) {
    if (categoryid == undefined) {
        throw 'CategoryID not provided.'
    }

    if (title == undefined) {
        throw 'Title not provided.'
    }

    return await knex('category').where({ id: categoryid }).update(
        {
            title
        },
        ['id', 'title']
    ).then((sql) => {
        console.log(sql)
        return (sql)
    }).catch((err) => {
        throw 'Category was not updated. Something went wrong';
    });
}

async function DeleteCategory(categoryid) {
    if (categoryid == undefined) {
        throw 'CategoryID not provided.';
    }

    return await knex('category').where('id', categoryid).del().then((sql) => {
        return 'Removed'
    }).catch((err) => {
        throw 'Category was not removed. Something went wrong';
    });
}


//#endregion
//#region Routes
categoryRoutes.get('/category', async (req, res) => {
    await knex('category')
        .select({
            id: 'id',
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

categoryRoutes.get('/category/:categoryid', async (req, res) => {
    try {
        const { categoryid } = req.params;
        res.send(await GetCategory(categoryid));
    } catch (err) {
        res.send(err)
    }
})

categoryRoutes.get('/category/:categoryid/task', async (req, res) => {
    try {
        const { categoryid } = req.params;
        res.send(await GetCategoryTasks(categoryid));
    } catch (err) {
        res.send(err)
    }
})

categoryRoutes.post('/category', async (req, res) => {
    try {
        const { title } = req.body
        res.send(await CreateCategory(title));
    } catch (err) {
        res.send(err)
    }
})

categoryRoutes.put('/category/:categoryid', async (req, res) => {
    try {
        const { categoryid } = req.params;
        const { title } = req.body;

        res.send(await UpdateCategory(categoryid, title));
    } catch (err) {
        res.send(err)
    }
})

categoryRoutes.delete('/category/:categoryid', async (req, res) => {
    try {
        const { categoryid } = req.params;
        res.send(await DeleteCategory(categoryid))
    } catch (err) {
        res.send(err)
    }
})


//#endregion

module.exports = {
    categoryRoutes,
    CreateCategory,
    DeleteCategory,
    GetCategory,
    GetCategoryTasks,
    UpdateCategory
}

