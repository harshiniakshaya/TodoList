const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")

const TodoModel = require('./Models/Todo')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/TodoList-MERN')

app.get('/get',(req,res)=>{
    TodoModel.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    })
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

// app.put('/update/:id',(req,res)=>{
//     const {id} = req.params;
//     // console.log(id);
//     TodoModel.findByIdAndUpdate({_id:id},{done:true})
//     .then(result => res.json(result))
//     .catch(err => res.json(err))
// })

app.put('/update/:id' , (req,res)=>{
    const { id } = req.params;
    TodoModel.findById(id)
    .then(task =>{
        if(task){
            task.done=!task.done;
            task.save()
                .then(updatedTask => res.json(updatedTask))
                .catch(err => res.status(500).json({ error: 'Failed to update task', details: err }));
        }
        else{
            res.status(404).json({ error: 'Task not found' });
        }
    })
    .catch(err => res.status(500).json({ error: 'Failed to find task', details: err }));
})

app.delete('/delete/:id',(req,res)=>{
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id:id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.listen(3001,()=>{
    console.log("server is running")
})
