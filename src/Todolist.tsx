import React, {useCallback} from 'react';
import {TodolistType} from './App';
import {MyEditableSpan} from "./MyEditableSpan";
import {MyAddItemForm} from "./MyAddItemForm";
import {addTaskAC} from "./store/TasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./store/TodolistsReducer";
import {AppRootStateType} from "./store/store";
import {Task} from "./Task";
import {Button} from "./Button";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodolistType
}

export const Todolist = React.memo(({todolist}: PropsType) => {

    const {id, title, filter} = todolist

    const dispatch = useDispatch()

    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id])

    if (filter === "active") {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone);
    }

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(id, title))
    }, [dispatch, title])

    const removeTodolist = useCallback(() => {
        dispatch(removeTodolistAC(id))
    }, [dispatch])

    const changeTodolistTitle = useCallback((title: string) => {
        dispatch(changeTodolistTitleAC(id, title))
    }, [dispatch, id, title])

    const onAllClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(id, 'all')), [dispatch])
    const onActiveClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(id, 'active')), [dispatch])
    const onCompletedClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(id, 'completed')), [dispatch])

    return <div>
        <h3><MyEditableSpan value={title} callback={changeTodolistTitle}/>
            <button onClick={removeTodolist}>x</button>
        </h3>
        <MyAddItemForm callback={addTask}/>
        <ul>
            {
                tasks.map(t => <Task key={t.id} todolistId={id} task={t} />
                )
            }
        </ul>
        <div>
            <Button callback={onAllClickHandler} filter={filter} value={'all'} nameButton={'All'} />
            <Button callback={onActiveClickHandler} filter={filter} value={'active'} nameButton={'Active'}/>
            <Button callback={onCompletedClickHandler} filter={filter} value={'completed'} nameButton={'Completed'}/>
        </div>
    </div>
})


