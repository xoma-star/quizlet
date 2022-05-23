import {useTypedSelector} from "./useTypedSelector";
import {useEffect, useState} from "react";
import {QuestionType, room} from "../schema";

const useRoom = () => {
    const {socket} = useTypedSelector(s => s.server)
    const {vkid} = useTypedSelector(s => s.user)
    const [roomData, setRoomData] = useState<room>({id: '', players: [], theme: '', mode: '', activeQuestion: -1, questions: []})
    const [roomReady, setRoomReady] = useState(false)
    const [timer, setTimer] = useState(0)
    const [question, setQuestion] = useState<QuestionType | null>(null)

    const callback = (i: string | number) => {
        socket?.emit('answerQuestion', {room: roomData.id, player: vkid, answer: i})
    }

    useEffect(() => {
        socket?.on('updatedRoomData', (data) => setRoomData(data))
        socket?.on('roomReady', () => setRoomReady(true))
        socket?.on('newQuestion', (data) => setQuestion(data.question))
    }, [socket])

    useEffect(() => {
        if(roomReady){
            setTimer(5)
            let interval = setInterval(() => setTimer((t) => t - 1), 1000)
            setTimeout(() => clearInterval(interval), 5000)
        }
    }, [roomReady])

    const answeredRightCount = (id: string) => {
        return roomData.questions.map(x => {
            if(x.answeredRight.indexOf(id) >= 0) return 1
            return 0
        }).filter((x) => x === 1).length
    }

    const players = roomData.players
        .sort((a, b) => {
            let k = answeredRightCount(a.id)
            let m = answeredRightCount(b.id)
            if(k > m) return 1
            if(k === m) return 0
            return -1
        })

    return {
        roomData,
        timer,
        roomReady,
        question,
        callback,
        players,
        answeredRightCount: answeredRightCount(vkid)
    }
}

export default useRoom