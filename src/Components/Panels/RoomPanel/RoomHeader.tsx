import {Div, Group, Title} from "@vkontakte/vkui";
import {modes, room, themes} from "../../../schema";
import React from "react";

interface props {
    roomData: room
}

const RoomHeader = ({roomData}: props) => {
    return <Group>
        <Div>
            <Title style={{paddingBottom: 16}} level={'1'}>{modes.find(x => x.id === roomData.mode)?.name}</Title>
            <Title level={'1'}>Тема викторины: {themes.find(x => x.id === roomData.theme)?.name}</Title>
        </Div>
    </Group>
}

export default RoomHeader