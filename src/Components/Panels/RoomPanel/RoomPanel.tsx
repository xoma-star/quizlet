import React from "react";
import { useEffect, useState } from "react"
import { useTypedSelector } from "../../../Hooks/useTypedSelector"
import {modes, room, themes} from "../../../schema";
import {
    Avatar, Button,
    Div,
    FixedLayout,
    Group,
    Header,
    HorizontalCell,
    HorizontalScroll,
    PanelHeader,
    Title
} from "@vkontakte/vkui";

const RoomPanel = () => {
    const {socket} = useTypedSelector(s => s.server)
    const [roomData, setRoomData] = useState<room>({id: '', players: [], theme: '', questions: [], mode: ''})
    const [roomReady, setRoomReady] = useState(false)
    const [timer, setTimer] = useState(0)
    useEffect(() => {
        socket?.on('updatedRoomData', (data) => setRoomData(data))
        socket?.on('roomReady', () => setRoomReady(true))
        socket?.on('roomStarted', () => alert('a'))
    }, [])

    useEffect(() => {
        if(roomReady){
            setTimer(5)
            let interval = setInterval(() => setTimer((t) => t - 1), 1000)
            setTimeout(() => clearInterval(interval), 5000)
        }
    }, [roomReady])
    return <React.Fragment>
        <PanelHeader separator={false}/>
        <Group>
            <Div>
                <Title style={{paddingBottom: 16}} level={'1'}>{modes.find(x => x.id === roomData.mode)?.name}</Title>
                <Title level={'1'}>Тема викторины: {themes.find(x => x.id === roomData.theme)?.name}</Title>
            </Div>
        </Group>
        <Group header={<Header mode={'secondary'}>знатоки</Header>}>
            <HorizontalScroll>
                <div style={{display: 'flex'}}>
                    {roomData.players.map(v => <HorizontalCell key={v.ava} header={v.name}><Avatar src={v.ava}/></HorizontalCell>)}
                </div>
            </HorizontalScroll>
        </Group>
        {}
        <FixedLayout vertical={'bottom'}>
            <Div style={{display: 'flex'}}><Button stretched size={'l'} loading={!roomReady} disabled mode={"overlay_secondary"}>{timer}</Button></Div>
        </FixedLayout>
    </React.Fragment>
}

export default RoomPanel