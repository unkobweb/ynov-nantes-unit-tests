const request = require('supertest');
const app = require('../app');
const mongoose = require("mongoose");
const { ToDo } = require('../toDoModel');

beforeAll(async () => {
    // Connect to MongoDB
    await mongoose
    .connect("mongodb://mongo:27017/toDoApp", { useNewUrlParser: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

    await ToDo.deleteMany({})

    const firstToDo = new ToDo({
        text: "Wash the kitchen floor"
    })
    await firstToDo.save();
})

describe('Tasks', () => {
    it('should return all tasks', async () => {
        const {body} = await request(app).get('/todo');
        expect(body[0].text).toBe('Wash the kitchen floor');
    })
    
    it('should create a new task', async () => {
        const {body} = await request(app).post('/todo').send({text: "Do my homeworks"})
        expect(body.text).toBe('Do my homeworks');
        expect(body.done).toBeFalsy();
    })
})