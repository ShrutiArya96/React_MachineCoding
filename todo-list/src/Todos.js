import './Todos.css';

import { useState } from 'react';

const Todo = ({ updateTaskStatus, updateTask, deleteTask, data }) => {
  const [isEditing, setIsEditing] = useState(false);

  const setTodoStatus =(evt) => {
    updateTaskStatus(data.id, evt.target.checked)
  }

  const deleteTodo =() => {
    deleteTask(data.id);
  }
  const saveNewTitle =(e) => {
    if(e.keyCode == 13 && e.target.value && e.target.value.length > 0) {
    updateTask(e.target.value, data.id);
    setIsEditing(false);
    }
  }

  return (
    <>
        <div className="todoItem">
            {
              !isEditing && <>
                <span>{data.title}</span>
                <input type='checkbox' onChange={(e) => setTodoStatus(e)} name="todoStatus" checked={data.completed}/>
                <button onClick={() => deleteTodo()}>Delete</button>
                <button onClick={() => setIsEditing(true)}>Edit</button>
              </>
            }
            {
              isEditing && <>
                <input type='input' defaultValue={data.title} onKeyUp={(e) => saveNewTitle(e)}/><span onClick={() => setIsEditing(false)}>Cancel</span>
              </>
            }
        </div>
    </>
  );
};

export default Todo;