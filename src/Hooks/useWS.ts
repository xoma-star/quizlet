import {useEffect} from "react";
import { io } from 'socket.io-client'
import {useActions} from "./useActions";
import {useTypedSelector} from "./useTypedSelector";
import {VKUI_Panels} from "../Redux/Reducers/vkui";

const useWS = () => {
    const {ServerSetWS, VKUI_HistoryPush} = useActions()
    const {vkid, ava, name} = useTypedSelector(s => s.user)
    useEffect(() => {
        if(vkid === '0') return
        let url
        if(process.env.NODE_ENV === 'production') url = 'wss://quizlet-server.herokuapp.com/'
        else url = 'ws://localhost:5000'
        const ws = io(url)
        ws.on('connect', () => ws.emit('handshake', {uid: vkid, hash: 'hello'}))
        ws.on('handshake', () => ServerSetWS(ws))
        ws.on('foundGame', (data) => {
            ws.emit(
                'addPlayerDataToRoom',
                {room: data.room, id: vkid, ava: ava, name: name},
                () => VKUI_HistoryPush({view: 'main', panel: VKUI_Panels.ROOM})
            )
        })
    }, [vkid])
}

export default useWS