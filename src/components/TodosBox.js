import React , {useState , useEffect} from 'react'
import TodosForm from './TodosForm'
import TodosList from './TodosList'
import uniqid from 'uniqid'

const TodosBox = () => {

    const [todoList, setTodoList] = useState([])

    useEffect(async() =>
    {
    const data = await fetch('http://localhost:3000/task')
    const json = await data.json()
    setTodoList(json)
    },[todoList])

    const addTask = async (text) =>{

        //Delete within data base (db.json)
        const taskObj = {text:text , id: uniqid(),complete:false}
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(taskObj)
        };
        fetch('http://localhost:3000/task',requestOptions)
    }

    const deleteTask = (taskId) => {
        const taskObj = todoList.filter((task)=>{
        if(task.id == taskId)
        return task
    })
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
        method: 'DELETE',
        headers: myHeaders
        };
        fetch(`http://localhost:3000/tasK/${taskObj[0].id}`,requestOptions)
    }

    const editTask = (taskId)=>{
        const currentText = todoList.filter(task => task.id == taskId)
        const newText = window.prompt('Edit your Task:',currentText[0].text)
        if(newText.trim() != '')
        {
           let taskObj = todoList.filter((task)=>{
               if(task.id == taskId)
               {
                task.text = newText
                return task
               }
           })
           const myHeaders = new Headers();
           myHeaders.append("Content-Type", "application/json");
           var requestOptions = {
           method: 'PATCH',
           headers: myHeaders,
           body: JSON.stringify({"text":taskObj[0].text,"complete":false})
           };
           fetch(`http://localhost:3000/task/${taskObj[0].id}`,requestOptions)
        }
        else
        alert('Enter Text')
    

    }
    const completeTask = (taskId) => {
            const taskObj = todoList.filter((task)=>{
                if(task.id == taskId)
                {
                task.complete = !task.complete
                return task
                }
            })

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: JSON.stringify({"complete":taskObj[0].complete})
            };
            fetch(`http://localhost:3000/task/${taskObj[0].id}`,requestOptions)
    }
        return (
            <div>
                <TodosForm addTask = {addTask}></TodosForm>
                <TodosList 
                    todoList = {todoList}
                    deleteTask={deleteTask}
                    editTask={editTask}
                    completeTask ={completeTask}
                ></TodosList>
            </div>
        )
}

export default TodosBox


