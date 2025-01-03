const { GetTask, CreateTask, UpdateTask, DeleteTask } = require("../routes/task.routes.js")

describe('Tasks', () => {
    describe('Get Task', () => {
        test('Should return error if request params doenst have a taskID', async () => {
            expect.assertions(1);
            try {
                await GetTask();
            } catch (error) {
                expect(error).toMatch('Task ID not provided.');
            }
        })
    })

    describe('Create Task', () => {
        test('Should return error if request body doenst have a title', async() => {
            expect.assertions(1);
            try {
                await CreateTask();
            } catch (error) {
                expect(error).toMatch('Title not provided.');
            }
        })

        test('Should return error if request body doenst have a category', async() => {
            expect.assertions(1);
            try {
                await CreateTask('title');
            } catch (error) {
                expect(error).toMatch('Category not provided.');
            }
        })
    })

    describe('Update Task', () => {
        test('Should return error if request params doenst have a taskID', async() => {
            expect.assertions(1);
            try {
                await UpdateTask();
            } catch (error) {
                expect(error).toMatch('TaskID not provided.');
            }
        })

        test('Should return error if request body doenst have a title', async() => {
            expect.assertions(1);
            try {
                await UpdateTask('id');
            } catch (error) {
                expect(error).toMatch('Title not provided.');
            }
        })

        test('Should return error if request body doenst have a category', async() => {
            expect.assertions(1);
            try {
                await UpdateTask('id', 'title');
            } catch (error) {
                expect(error).toMatch('Category not provided.');
            }
        })
    })

    describe('Delete Task', () => {
        test('Should return error if request params doenst have a taskID', async () => {
            expect.assertions(1);
            try {
                await DeleteTask();
            } catch (error) {
                expect(error).toMatch('Task ID not provided.');
            }
        })
    })
})