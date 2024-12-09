const {categoryRoutes} = require('./category.routes.js')
const {taskRoutes} = require('./task.routes.js')

const routeList = [
    categoryRoutes,
    taskRoutes
]

module.exports = { routeList };