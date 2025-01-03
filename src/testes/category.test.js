const { CreateCategory, GetCategory, GetCategoryTasks, UpdateCategory, DeleteCategory } = require("../routes/category.routes.js")

describe('Category', () => {
    describe('Get Category', () => {
        test('Should return error if request params doenst have a taskID', async () => {
            expect.assertions(1);
            try {
                await GetCategory();
            } catch (error) {
                expect(error).toMatch('CategoryID not provided.');
            }
        })
    })

    describe('Get Category Tasks', () => {
        test('Should return error if request params doenst have a taskID', async () => {
            expect.assertions(1);
            try {
                await GetCategoryTasks();
            } catch (error) {
                expect(error).toMatch('CategoryID not provided.');
            }
        })
    })

    describe('Create Category', () => {
        test('Should return error if request body doenst have a title', async () => {
            expect.assertions(1);
            try {
                await CreateCategory();
            } catch (error) {
                expect(error).toMatch('Title not provided.');
            }
        })
    })

    describe('Update Task', () => {
        test('Should return error if request params doenst have a taskID', async () => {
            expect.assertions(1);
            try {
                await UpdateCategory();
            } catch (error) {
                expect(error).toMatch('CategoryID not provided.');
            }
        })

        test('Should return error if request body doenst have a title', async () => {
            expect.assertions(1);
            try {
                await UpdateCategory('id');
            } catch (error) {
                expect(error).toMatch('Title not provided.');
            }
        })
    })

    describe('Delete Task', () => {
        test('Should return error if request params doenst have a taskID', async () => {
            expect.assertions(1);
            try {
                await DeleteCategory();
            } catch (error) {
                expect(error).toMatch('CategoryID not provided.');
            }
        })
    })
})