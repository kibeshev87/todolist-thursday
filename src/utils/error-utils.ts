import {AppActionsType, setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";

export const handleNetworkError  = (dispatch: Dispatch<AppActionsType>, message: string) => {
        dispatch(setAppErrorAC(message))
        dispatch(setAppStatusAC('failed'))
}
export const handleAppError = <T> (dispatch: Dispatch<AppActionsType>,
                                   data: ResponseType<T>) => {
        dispatch(setAppErrorAC(data.messages.length
            ? data.messages[0]
            : 'Some error occurred'))
        dispatch(setAppStatusAC('failed'))
}

//
// function f1 <T>(a: T):T {
//         return a
// }
// f1(5)// Здесь Т - это некоторый параметр-тип Т,
//  который будет захвачен при вызове функции.
// Конструкция <Т> после имени ф-ции указывает на то, что эта ф-ция
// собирается захватить тип и подменить им все T