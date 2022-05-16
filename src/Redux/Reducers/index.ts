import {VKUI_Reducer} from './vkui'
import {combineReducers} from "redux";
import {ServerReducer} from "./server";
import {UserReducer} from "./user";

export const rootReducer = combineReducers({
    vkui: VKUI_Reducer,
    server: ServerReducer,
    user: UserReducer
})