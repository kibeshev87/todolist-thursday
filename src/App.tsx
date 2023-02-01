import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {MyAddItemForm} from "./MyAddItemForm";
import {useDispatch, useSelector} from 'react-redux';
import {addTodolistAC,} from "./store/TodolistsReducer";
import {AppRootStateType} from "./store/store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const dispatch = useDispatch()

    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])

    return (
        <div className="App">
            <MyAddItemForm callback={addTodolist}/>
            {
                todolists.map(tl => <Todolist key={tl.id} todolist={tl}/>
                )
            }
        </div>
    );
}

export default App;
