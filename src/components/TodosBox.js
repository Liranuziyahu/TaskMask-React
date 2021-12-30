import React , {useState , useEffect , createContext , useReducer} from 'react'
import TodosForm from './TodosForm'
import TodosList from './TodosList'
import uniqid from 'uniqid'
import axios from 'axios'

export const ListContext = createContext('')

 const TodosBox = () => {

    const [todoList, setTodoList] = useState([])
    useEffect(async() =>
    {
    const data = await fetch('http://localhost:3000/task')
    const json = await data.json()
    setTodoList(json)
    },[])

    const addTask = async (text) =>{
        //Delete within data base (db.json)
        const taskObj = {text:text , id: uniqid(),complete:false}

        axios.post('http://localhost:3000/task',taskObj)
        .then(response => console.log(response))
        .then(()=> setTodoList([...todoList,taskObj]))
        .catch(err => alert('server error',err))
    }

    const deleteTask = (taskId) => {
        const taskObj = todoList.filter((task)=>{
        if(task.id != taskId)
        return task
    })
    axios.delete(`http://localhost:3000/task/${taskId}`)
    .then(response => console.log(response))
    .then(()=> setTodoList(taskObj))
    .catch(err => alert('server error',err))
    }

    const editTask = (taskId)=>{
        const currentText = todoList.filter(task => task.id == taskId)
        const newText = window.prompt('Edit your Task:',currentText[0].text)
        if(newText.trim() != '')
        {
           let taskObj = todoList.map((task)=>{
               if(task.id == taskId)
               {
                task.text = newText
               }
               return task
           })
           const newList = taskObj.filter(task => task.id == taskId)
           console.log(newList)
           axios.put(`http://localhost:3000/task/${taskId}`,newList[0],newList[0].complete = false )
           .then(response => console.log(response))
           .then(()=> setTodoList(taskObj))
           .catch(err => alert('server error',err))
        }
        else
        alert('Enter Text')
    

    }
    const completeTask = (taskId) => {
            const cTask = todoList.map((task)=>{
                if(task.id == taskId)
                    task.complete = !task.complete
                return task
            })
            const newTask = todoList.filter((task)=> task.id==taskId)
           
            axios.put(`http://localhost:3000/task/${taskId}`,newTask[0])
            // .then(response => console.log(response))
            .then(()=> setTodoList(cTask))
            .catch(err => alert('server error',err))
        }
        return (
            <div>
                <TodosForm addTask = {addTask}></TodosForm>
                <ListContext.Provider value={{todoList , deleteTask , editTask , completeTask}}>
                    <TodosList></TodosList>
                </ListContext.Provider>
               
            </div>
        )
};


export default TodosBox

