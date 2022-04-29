const todoService = require('../services/todoService');
const todoModel = require('../toDoModel');
const mockingoose = require('mockingoose');

describe('Todo service', () => {
    it('get all tasks', async () => {
        mockingoose(todoModel).toReturn([
            {
             text: 'Learn Node.js',
             done: false
            },
            {
              text: 'Learn Vue.js', 
              done: true
            }
          ], 'find');

        const todos = await todoService.getTasks();
        expect(todos[0].text).toBe('Learn Node.js');
        expect(todos[0].done).toBeFalsy();
        expect(todos[1].text).toBe('Learn Vue.js');
        expect(todos[1].done).toBeTruthy();
    })

    it('create a new task', async () => {
        mockingoose(todoModel).toReturn({
            text: 'Learn Node.js',
            done: false
        }, 'save');

        const todo = await todoService.createTask({text: 'Learn Node.js'});
        expect(todo.text).toBe('Learn Node.js');
        expect(todo.done).toBeFalsy();
    })
})