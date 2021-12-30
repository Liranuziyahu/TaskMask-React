import React ,{useContext} from 'react'
import { AiFillDelete } from 'react-icons/ai';
import { BsFillPenFill } from "react-icons/bs";
import { BsBookmarkCheckFill } from "react-icons/bs";
import {ListContext} from './TodosBox'

const TodosList = () => {
    const value = useContext(ListContext)
    return (
        <>
            {value.todoList.map( (task) =>{
                return (
                    <li data-taskid={task.id}> 
                        <span style = {{textDecoration: task.complete == true ? 'line-through':'none'}} >{task.text}</span>
                        <button onClick={ (e) => value.deleteTask(e.target.closest('li').dataset.taskid)}><AiFillDelete/></button>
                        <button onClick={ (e) => value.editTask(e.target.closest('li').dataset.taskid)}><BsFillPenFill/></button>
                        <button onClick={ (e) => value.completeTask(e.target.closest('li').dataset.taskid)}><BsBookmarkCheckFill/></button>
                    </li>
                )
            })}
        </>
    )
}

export default TodosList
