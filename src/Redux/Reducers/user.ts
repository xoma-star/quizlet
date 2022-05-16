export enum UserActionTypes{
    SET_VKID = 'SET_VKID',
    SET_AVA = 'SET_AVA',
    SET_NAME = 'SET_NAME'
}

interface State{
    vkid: string,
    ava: string,
    name: string
}

const defaultState: State = {
    vkid: '0',
    ava: '',
    name: ''
}

interface VKID_Action{
    type: UserActionTypes.SET_VKID,
    payload: string
}
interface Name_Action{
    type: UserActionTypes.SET_NAME,
    payload: string
}
interface Ava_Action{
    type: UserActionTypes.SET_AVA,
    payload: string
}

export type UserAction = VKID_Action | Name_Action | Ava_Action

export const UserReducer = (state: State = defaultState, action: UserAction): State => {
    switch (action.type){
        case UserActionTypes.SET_VKID: return {...state, vkid: action.payload}
        case UserActionTypes.SET_NAME: return {...state, name: action.payload}
        case UserActionTypes.SET_AVA: return {...state, ava: action.payload}
        default: return state
    }
}