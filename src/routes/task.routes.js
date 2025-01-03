const express = require('express')
//initialize knex
const knexConfig = require('../../db/knexfile');
const knex = require('knex')(knexConfig['development'])

const taskRoutes = express.Router();

//#region CRUD functions
//Get specific Task
async function GetTask(taskid) {
    if (taskid == undefined) {
        throw 'Task ID not provided.';
    }

    return await knex('task').select('title').from('task').where('id', taskid).then((sql) => {
        return sql;
    }).catch((err) => {
        throw 'Task not found.';
    });
}

//Update Specific Task
async function CreateTask(title, category) {
    if (title == undefined) {
        throw 'Title not provided.';
    }

    if (category == undefined) {
        throw 'Category not provided.';
    }

    return await knex('task').insert({ title, category }).then((sql) => {
        return sql;
    }).catch((err) => {
        throw 'Task was not created. Something went wrong';
    });
}

async function UpdateTask(taskid, title, category) {
    if (taskid == undefined) {
        throw 'TaskID not provided.';
    }

    if (title == undefined) {
        throw 'Title not provided.';
    }

    if (category == undefined) {
        throw 'Category not provided.';
    }

    return await knex('task').where({ id: taskid }).update(
        {
            title,
            category
        },
        ['id', 'title', 'category']
    ).then((sql) => {
        return sql;
    }).catch((err) => {
        throw 'Task was not updated. Something went wrong';
    });
}

//Get specific Task
async function DeleteTask(taskid) {
    if (taskid == undefined) {
        throw 'Task ID not provided.';
    }

    return await knex('task').where('id', taskid).del().then((sql) => {
        return 'Removed';
    }).catch((err) => {
        throw 'Task was not removed. Something went wrong';
    });
}

//#endregion

//#region Routes
taskRoutes.get('/task', async (req, res) => {
    await knex('task')
        .select({
            id: 'id',
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

taskRoutes.get('/task/:taskid', async (req, res) => {
    try {
        const { taskid } = req.params
        res.send(await GetTask(taskid));
    } catch (err) {
        res.send(err)
    }
});


taskRoutes.post('/task', async (req, res) => {
    try {
        const { title, category } = req.body;

        res.send(await CreateTask(title, category))
    } catch (err) {
        res.send(err)
    }
})

taskRoutes.put('/task/:taskid', async (req, res) => {
    try {
        const { taskid } = req.params;
        const { title, category } = req.body;

        res.send(await UpdateTask(taskid, title, category));
    } catch (err) {
        res.send(err)
    }
})

taskRoutes.delete('/task/:taskid', async (req, res) => {
    try {
        const { taskid } = req.params;

        res.send(await DeleteTask(taskid));
    } catch (err) {
        res.send(err)
    }
})

//#endregion


module.exports = {
    taskRoutes,
    GetTask,
    CreateTask,
    DeleteTask,
    UpdateTask
}

