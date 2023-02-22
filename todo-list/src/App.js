import { useState, useMemo, useCallback } from "react";
import todos from "./data/todos";
import Todo from "./Todos";

const App = () => {
  const [todoList, setTodoList] = useState(todos);
  const [showNewTaskContainer, setshowNewTaskContainer] = useState(false)

  function updateTaskStatus(id, value) {
    let taskList = JSON.parse(JSON.stringify(todoList));
    taskList.forEach(task => {
      if(id == task.id) {
        task.completed = value;
      }
    })
    setTodoList(taskList);
  }

  function deleteTask(id) {
    let taskList = JSON.parse(JSON.stringify(todoList));
    let idx = taskList.findIndex(task=> task.id == id);
    taskList.splice(idx, 1);
    setTodoList(taskList);
  }

  function updateTask(value, id) {
    let taskList = JSON.parse(JSON.stringify(todoList));
    let idx = taskList.findIndex(task=> task.id == id);
    taskList[idx].title = value;
    setTodoList(taskList);
  }

  function addNewTask(e) {
    if(e.keyCode == 13 && e.target.value && e.target.value.length > 0) {
      let taskList = JSON.parse(JSON.stringify(todoList));
      let newTask = {
        id: new Date().getTime(),
        title: e.target.value,
        completed: false
      }
      taskList.unshift(newTask);
      setTodoList(taskList);
      setshowNewTaskContainer(false)
    }
  }

  return (
    <>
      <button onClick={() => setshowNewTaskContainer(true)}>Add new task</button>
      <div className="add-new-todo" style={{'display': showNewTaskContainer ? 'block' : 'none'}}>
        <input onKeyUp={(e) => addNewTask(e)}/><span onClick={() => setshowNewTaskContainer(false)}>X</span>
      </div>
      {todoList.map((todo, i) =>  <Todo key={i} updateTask={updateTask} deleteTask={deleteTask} updateTaskStatus={updateTaskStatus} data={todo}/>)}
    </>
  );
};

export default App;
