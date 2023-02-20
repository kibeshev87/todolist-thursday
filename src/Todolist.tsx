import React, {ChangeEvent} from 'react';
import {NewAddItemForm} from "./NewAddItemForm";
import {NewEditableSpan} from './NewEditableSpan';
import {useAppDispatch, useAppSelector} from "./store/hooks";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/TasksReducer";
import {TaskStatuses, TodolistType} from './store/todolists-api';
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC
} from "./store/TodolistsReducer";

/*export type TaskType = {
    id: string
    title: string
    isDone: boolean
}*/

type PropsType = {
    todolist: TodolistType
    filter: FilterValuesType
}

export function Todolist({todolist, filter}: PropsType) {

    const {id, title} = todolist

    let tasks = useAppSelector(state => state.tasks[id])

    if (filter === "active") {
        tasks = tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    const dispatch = useAppDispatch()

    const addTask = (title: string) => {
        dispatch(addTaskAC(id, title))
    }
    const removeTodolist = () => {
        dispatch(removeTodolistAC(id))
    }
    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC(id, title))
    }

    const onAllClickHandler = () => dispatch(changeTodolistFilterAC(id, 'all'))
    const onActiveClickHandler = () => dispatch(changeTodolistFilterAC(id, "active"))
    const onCompletedClickHandler = () => dispatch(changeTodolistFilterAC(id, "completed"))

    return <div>
        <h3><NewEditableSpan value={title} callback={changeTodolistTitle}/>
            <button onClick={removeTodolist}>x</button>
        </h3>
        <NewAddItemForm addItem={addTask}/>
        <ul>
            {
                tasks.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(id, t.id))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(id, t.id, newIsDoneValue))
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        dispatch(changeTaskTitleAC(id, t.id, newValue))
                    }


                    return <li key={t.id} className={t.status === TaskStatuses.Completed ? 'is-done' : ''}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        <NewEditableSpan value={t.title} callback={onTitleChangeHandler}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}


