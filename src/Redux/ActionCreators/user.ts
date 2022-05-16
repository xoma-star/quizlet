import {Dispatch} from "react";
import {UserAction, UserActionTypes} from "../Reducers/user";

export const UserSetVKID = (p: number) => {
    return (dispatch: Dispatch<UserAction>) => {
        dispatch({type: UserActionTypes.SET_VKID, payload: p.toString()})
    }
}

export const UserSetName = (p: string) => {
    return (dispatch: Dispatch<UserAction>) => {
        dispatch({type: UserActionTypes.SET_NAME, payload: p})
    }
}

export const UserSetAva = (p: string) => {
    return (dispatch: Dispatch<UserAction>) => {
        dispatch({type: UserActionTypes.SET_AVA, payload: p})
    }
}