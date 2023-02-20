import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    value: string
    callback: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const onDoubleClickHandler = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const onBlurHandler = () => {
        setEditMode(false);
        props.callback(title);
    }
    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <input value={title} onChange={changeTitleHandler} onBlur={onBlurHandler} autoFocus/>
        : <span onDoubleClick={onDoubleClickHandler}>{props.value}</span>
}
