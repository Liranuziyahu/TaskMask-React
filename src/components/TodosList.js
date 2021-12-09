import React from 'react'

const TodosList = ({todoList,deleteTask,editTask,completeTask}) => {
    return (
        <>
            {todoList.map( (task) =>{
                return (
                    <li data-taskid={task.id}> 
                        <span style = {{textDecoration: task.complete == true ? 'line-through':'none'}} >{task.text}</span>
                        <button onClick={ (e) => deleteTask(e.target.closest('li').dataset.taskid)}>Delete</button>
                        <button onClick={ (e) => editTask(e.target.closest('li').dataset.taskid)}>Edit</button>
                        <button onClick={ (e) => completeTask(e.target.closest('li').dataset.taskid)}>Complete</button>
                    </li>
                )
            })}
        </>
    )
}

export default TodosList
