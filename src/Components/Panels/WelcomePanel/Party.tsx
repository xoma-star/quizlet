import {Avatar, FixedLayout, Group, Header, HorizontalCell, HorizontalScroll, InitialsAvatar} from "@vkontakte/vkui";
import React from "react";
import {useTypedSelector} from "../../../Hooks/useTypedSelector";
import {Icon24AddCircleOutline} from "@vkontakte/icons";

const Party = () => {
    const {ava, name} = useTypedSelector(s => s.user)
    return <FixedLayout vertical={'bottom'}>
        <Group header={<Header mode={'secondary'}>группа</Header> }>
            <HorizontalScroll>
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    <HorizontalCell header={name}><Avatar src={ava} size={48}/></HorizontalCell>
                    <HorizontalCell style={{float: 'right'}} header={'Пригласить'}>
                        <Avatar><Icon24AddCircleOutline width={28} height={28}/></Avatar>
                    </HorizontalCell>
                </div>
            </HorizontalScroll>
        </Group>
    </FixedLayout>
}

export default Party