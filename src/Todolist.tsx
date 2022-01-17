import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import styles from './Todolist.module.css';

type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

type PropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (taskId: string) => void;
    addTask: (title: string) => void;
    changeStatus: (isDone: boolean, id: string) => void;
}

export function Todolist(props: PropsType) {
    let [filter, setFilter] = useState<FilterValuesType>("all");

    let tasksForTodolist = props.tasks;

    if (filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    let [title, setTitle] = useState("")
    let [error, setError] = useState(true);

    const addTask = () => {
        props.addTask(title);
        setTitle("");
        setError(true);
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false);
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => changeFilter("all");
    const onActiveClickHandler = () => changeFilter("active");
    const onCompletedClickHandler = () => changeFilter("completed");

    const onChangeForChangeStatus = (e: ChangeEvent<HTMLInputElement>, id: string) => {
        props.changeStatus(e.currentTarget.checked, id);
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? styles.error : ''}
                   value={title}
                   onChange={ onChangeHandler }
                   onKeyPress={ onKeyPressHandler }
            />
            <button onClick={addTask}>+</button>
            { error && <div className={styles.errorMessage}>Title is required</div> }
        </div>
        <ul>
            {
                tasksForTodolist.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)
                    // const onChangeForChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                    //     props.changeStatus(e.currentTarget.checked, t.id);
                    // }

                    return <li key={t.id} className={t.isDone ? styles.isDone : ''}>
                        <input type="checkbox"
                               onChange={(e) => onChangeForChangeStatus(e, t.id)}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={ onClickHandler }>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={filter === 'all' ? styles.activeFilter : ''} onClick={ onAllClickHandler }>All</button>
            <button className={filter === 'active' ? styles.activeFilter : ''} onClick={ onActiveClickHandler }>Active</button>
            <button className={filter === 'completed' ? styles.activeFilter : ''} onClick={ onCompletedClickHandler }>Completed</button>
        </div>
    </div>
}
