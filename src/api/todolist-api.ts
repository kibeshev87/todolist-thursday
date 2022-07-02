import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '750889c8-f4ed-4786-bc49-0a937e4ab551'
    }
})

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type BaseResponseType<T = {}> = {
    resultCode: number
    messages: []
    fieldsErrors: string[]
    data: T
}


export const TodolistApi = {
    getTodolists: () => {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist: (title: string) => {
        return instance.post<BaseResponseType<{ data: { item: TodolistType } }>>('todo-lists', {title})
    },
    deleteTodolist: (todolistId: string) => {
        return instance.delete<BaseResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle: (payload: { todolistId: string, title: string }) => {
        return instance.put<BaseResponseType>(`todo-lists/${payload.todolistId}`, {title: payload.title})
    }
}

