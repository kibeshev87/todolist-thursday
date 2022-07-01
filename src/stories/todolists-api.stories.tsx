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
    const todolistId = '62632f2b-cafa-446d-bb6a-1b85b8d45d70'
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
    const todolistId = 'dabd03d4-f79b-4f0c-a709-399bb94605f3'
    const title = 'React>>>>>>>'
    useEffect(() => {
        TodolistApi.updateTodolistTitle({todolistId, title})
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

