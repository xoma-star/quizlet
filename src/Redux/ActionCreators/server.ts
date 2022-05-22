import {Dispatch} from "react";
import {Socket} from "socket.io-client";
import {cachedPayload, ServerAction, ServerActionTypes} from "../Reducers/server";

export const ServerSetWS = (p: Socket) => {
    return (dispatch: Dispatch<ServerAction>) => {
        dispatch({type: ServerActionTypes.SET_WS_SERVER, payload: p})
    }
}

export const UpdateCache = (p: cachedPayload) => {
    return (dispatch: Dispatch<ServerAction>) => {
        dispatch({type: ServerActionTypes.UPDATE_CACHE, payload: p})
    }
}