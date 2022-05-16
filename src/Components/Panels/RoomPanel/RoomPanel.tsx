import { useEffect, useState } from "react"
import { useTypedSelector } from "../../../Hooks/useTypedSelector"

const RoomPanel = () => {
    const {socket} = useTypedSelector(s => s.server)
    const [roomData, setRoomData] = useState({})
    useEffect(() => {
        socket?.on('updatedRoomData', (data) => setRoomData(data))
    }, [socket])
    return <div>{JSON.stringify(roomData)}</div>
}

export default RoomPanel