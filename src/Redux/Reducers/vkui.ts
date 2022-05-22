import {Appearance} from '@vkontakte/vkui'
import {AppearanceType} from "@vkontakte/vk-bridge";

export type VKUI_History = {
    view: string,
    panel: string
}

export enum VKUI_ActionTypes{
    HISTORY_PUSH = 'HISTORY_PUSH',
    HISTORY_BACK = 'HISTORY_BACK',
    SET_MODAL = 'SET_MODAL',
    SET_APPEARANCE = 'SET_APPEARANCE',
    HISTORY_CLEAR = 'HISTORY_CLEAN'
}

export enum VKUI_Panels{
    MAIN = 'MAIN',
    GAME_MODE = 'GAME_MODE',
    GAME_SEARCH = 'GAME_SEARCH',
    ROOM = 'ROOM'
}

export enum VKUI_Modals{

}

interface State{
    history: VKUI_History[],
    modal: (null | VKUI_Modals)[],
    scheme: AppearanceType
}

interface VKUI_HistoryPushAction{
    type: VKUI_ActionTypes.HISTORY_PUSH,
    payload: VKUI_History
}

interface VKUI_HistoryBackAction{
    type: VKUI_ActionTypes.HISTORY_BACK | VKUI_ActionTypes.HISTORY_CLEAR
}

interface VKUI_ModalAction{
    type: VKUI_ActionTypes.SET_MODAL,
    payload: VKUI_Modals | null
}

interface VKUI_AppearanceAction{
    type: VKUI_ActionTypes.SET_APPEARANCE,
    payload: AppearanceType
}

export type VKUI_Action = VKUI_ModalAction | VKUI_AppearanceAction | VKUI_HistoryPushAction | VKUI_HistoryBackAction

const defaultState: State = {
    history: [{panel: VKUI_Panels.MAIN, view: 'main'}],
    modal: [null],
    scheme: Appearance.LIGHT
}

export const VKUI_Reducer = (state: State = defaultState, action: VKUI_Action): State => {
    let h = [...state.history]
    let mh = [...state.modal]
    switch (action.type){
        case VKUI_ActionTypes.SET_APPEARANCE: return {...state, scheme: action.payload}
        case VKUI_ActionTypes.HISTORY_BACK:
            if(h.length > 1) h.pop()
            return {...state, history: h}
        case VKUI_ActionTypes.HISTORY_CLEAR: return {...state, history: defaultState.history}
        case VKUI_ActionTypes.HISTORY_PUSH: return {...state, history: [...state.history, action.payload]}
        case VKUI_ActionTypes.SET_MODAL:
            if(action.payload) mh.push(action.payload)
            else if(mh.length > 1) mh.pop()
            return {...state, modal: mh}
        default: return state
    }
}