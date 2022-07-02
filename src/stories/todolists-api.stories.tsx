import React, {useEffect, useState} from 'react'
import {TodolistApi} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
            TodolistApi.getTodolists()
                .then((res) => {
                    setState(res.data)
                })

        }, []
    )

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    let title = 'Todolist for Dmitry'
    useEffect(() => {
        TodolistApi.createTodolist(title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'a466b64f-9db0-41ce-bf57-6db86d59060b'
    useEffect(() => {
        TodolistApi.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'da681e46-4f55-4a08-b1f8-857dae02d317'
    const title = 'React>>>>>>>'

    useEffect(() => {
        TodolistApi.updateTodolistTitle({todolistId, title})
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

