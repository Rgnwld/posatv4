const knex = require("knex")

knex('category')
    .select({
        id: 'id',
        title: 'title'
    })
    .then((users) => {
        return res.json(users);
    })
    .catch((err) => {
        console.error(err);
        return res.json({ success: false, message: 'An error occurred, please try again later.' });
    })