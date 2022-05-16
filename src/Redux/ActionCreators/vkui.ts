import {Dispatch} from "react";
import {VKUI_Action, VKUI_ActionTypes, VKUI_History, VKUI_Modals} from "../Reducers/vkui";
import {AppearanceType} from "@vkontakte/vk-bridge";


export const VKUI_HistoryPush = (p: VKUI_History) => {
    return (dispatch: Dispatch<VKUI_Action>) => {
        window.history.pushState({}, '')
        dispatch({type: VKUI_ActionTypes.HISTORY_PUSH, payload: p})
    }
}

export const VKUI_HistoryBack = () => {
    return (dispatch: Dispatch<VKUI_Action>) => dispatch({type: VKUI_ActionTypes.HISTORY_BACK})
}

export const VKUI_ModalSet = (p: null | VKUI_Modals) => {
    return (dispatch: Dispatch<VKUI_Action>) => {
        window.history.pushState({}, '')
        dispatch({type: VKUI_ActionTypes.SET_MODAL, payload: p})
    }
}

export const VKUI_AppearanceSet = (p: AppearanceType) => {
    return (dispatch: Dispatch<VKUI_Action>) => dispatch({type: VKUI_ActionTypes.SET_APPEARANCE, payload: p})
}