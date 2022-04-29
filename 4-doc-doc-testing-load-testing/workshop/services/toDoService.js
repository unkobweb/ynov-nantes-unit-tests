const ToDo = require('../toDoModel.js').ToDo;

const getTasks = () => {
    return ToDo.find({});
}

async function createTask(body) {
  const toDo = new ToDo({
    text: body.text,
  });
  return toDo.save(toDo)
}

const markTaskToDone = (id) => {
    return ToDo.findOneAndUpdate({ _id: id }, { done: true })
} 

module.exports = {createTask, getTasks}