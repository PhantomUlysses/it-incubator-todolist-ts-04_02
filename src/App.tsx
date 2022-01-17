import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import { v1 } from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    let [tasks, setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false },
    ]);
    
    const changeStatus = (isDone: boolean, id: string) => {
        // let currentString = tasks.find(f => f.id === id);
        // if (currentString) {
        //     currentString.isDone = isDone;
        // }
        // setTasks([...tasks]);

        setTasks(tasks.map(m => m.id === id ? {...m, isDone: isDone} : m));
    }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);
    }

    function addTask(title: string) {
        if (title.trim() !== '') {
            let task = { id: v1(), title: title.trim(), isDone: false };
            let newTasks = [task, ...tasks];
            setTasks(newTasks);
        }
    }





    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasks}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeStatus={changeStatus}/>
        </div>
    );
}

export default App;
