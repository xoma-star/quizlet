import { Socket } from 'socket.io-client'
import {themes} from "../../schema";

export enum ServerActionTypes{
    SET_WS_SERVER = 'SET_WS_SERVER',
    UPDATE_CACHE = 'UPDATE_CACHE'
}

interface cached{
    updated: number,
    refresh: number
}

interface availableThemes extends cached {value: {id: string, name: string}[]}

interface selectedThemes extends cached {value: string[]}

export type cachedPayload = {themesAvailable: availableThemes} | {themesSelected: selectedThemes} | {modesSelected: selectedThemes}

export interface cachedFields{
    themesAvailable: availableThemes,
    themesSelected: selectedThemes,
    modesSelected: selectedThemes
}

interface State{
    socket: Socket | null,
    cached: cachedFields
}

const defaultState: State = {
    socket: null,
    cached: {
        themesAvailable: {updated: 0, value: themes, refresh: 600},
        themesSelected: {updated: 0, value: [], refresh: 600},
        modesSelected: {updated: 0, value: [], refresh: 0},
    }
}

export type ServerAction = {type: ServerActionTypes.SET_WS_SERVER, payload: Socket} |
                            {type: ServerActionTypes.UPDATE_CACHE, payload: cachedPayload}

export const ServerReducer = (state: State = defaultState, action: ServerAction) => {
    switch (action.type){
        case ServerActionTypes.SET_WS_SERVER: return {...state, socket: action.payload}
        case ServerActionTypes.UPDATE_CACHE: return {...state, cached: {...state.cached, ...action.payload}}
        default: return state
    }
}