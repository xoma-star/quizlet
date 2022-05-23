import {Avatar, Group, Header, HorizontalCell, HorizontalScroll} from "@vkontakte/vkui";
import React from "react";
import {playerInRoom} from "../../../schema";

export interface IUsers extends playerInRoom{
    ava: string,
    name: string,
    id: string,
    badge?: boolean | React.ReactElement
}

interface props{
    users: IUsers[],
    header?: boolean
}

const UsersRow = ({users}: props) => {
    const avatar = (v: IUsers) => {
        let a = <Avatar src={v.ava}/>
        if(v.badge) return React.cloneElement(a, {badge: v.badge})
        return a
    }
    return <Group header={<Header mode={'secondary'}>знатоки</Header>}>
        <HorizontalScroll>
            <div style={{display: 'flex'}}>
                {users.map(v =>
                    <HorizontalCell key={v.ava} header={v.name}>
                        {avatar(v)}
                    </HorizontalCell>)}
            </div>
        </HorizontalScroll>
    </Group>
}

export default UsersRow