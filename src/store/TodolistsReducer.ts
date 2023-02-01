import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

const initialState: TodolistType[] = []

export const todolistsReducer = (state = initialState, action: TodolistsReducerType): TodolistType[] => {
    switch (action.type) {
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(el => el.id === action.payload.todolistId
                ? {...el, filter: action.payload.filter} : el)
        }
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.payload.todolistId)
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el => el.id === action.payload.todolistId
                ? {...el, title: action.payload.title} : el)
        }
        case "ADD-TODOLIST": {
            const newTodolist: TodolistType = {id: action.payload.todolistId, title: action.payload.title, filter: "all"}
                return [newTodolist, ...state]
        }

        default:
            return state
    }
}

type TodolistsReducerType = ChangeTodolistFilterACType
    | RemoveTodolistACType
    | ChangeTodolistTitleACType
    | AddTodolistACType

type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistId,
            filter
        }
    } as const
}

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {todolistId}
    } as const
}

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistId,
            title
        }
    } as const
}

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            todolistId: v1(),
            title
        }
    } as const
}
