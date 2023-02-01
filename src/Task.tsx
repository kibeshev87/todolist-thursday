import React, {ChangeEvent, useCallback} from 'react';
import {MyEditableSpan} from "./MyEditableSpan";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/TasksReducer";
import {useDispatch} from "react-redux";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    todolistId: string
    task: TaskType
}

export const Task = React.memo(({task, todolistId}: TaskPropsType) => {

    const {id, title, isDone} = task

    const dispatch = useDispatch()

    const onClickHandler = useCallback(() => dispatch(removeTaskAC(todolistId, id)), [dispatch])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(todolistId, id, newIsDoneValue))
    }, [dispatch, todolistId, id, isDone])

    const onTitleChangeHandler = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(todolistId, id, newValue))
    }, [dispatch, todolistId, id, title])

    return (
        <li className={task.isDone ? "is-done" : ""}>
            <input type="checkbox" onChange={onChangeHandler} checked={isDone}/>
            <MyEditableSpan value={title} callback={onTitleChangeHandler} />
            <button onClick={onClickHandler}>x</button>
        </li>
    );
})

