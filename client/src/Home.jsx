import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios' //to pass the data from the client to the server
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';

const Home = () => {
    const [todos,setTodos] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:3001/get')
        .then(res=>setTodos(res.data))
        .catch(err=>console.log(err))
    },[])

    const handleEdit = (id) =>{
        axios.put('http://localhost:3001/update/'+id)
        .then(res=>{
            location.reload()
        })
        .catch(err=>console.log(err))
    }

    const handleDelete = (id) =>{
        axios.delete('http://localhost:3001/delete/'+id)
        .then(res=>{
            location.reload()
        })
        .catch(err=>console.log(err))
    }

  return (
    <div className='home'>
        <h2>Todo List</h2>
        <Create />
        {
            todos.length===0?<div className='no-records-text'>NO RECORDS</div> :
            todos.map(todo=>(
                <div className='task'>
                    <div className='checkbox' onClick={()=>handleEdit(todo._id)}>
                        {todo.done ? 
                            <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>
                            :
                            <BsCircleFill className='icon' />
                        }

                        <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                    </div>
                    <div>
                        <span><BsFillTrashFill className='icon' 
                        onClick={() => handleDelete(todo._id)}/></span>
                    </div>
                    
                </div>
            ))
        }
    </div>
  )
}

export default Home