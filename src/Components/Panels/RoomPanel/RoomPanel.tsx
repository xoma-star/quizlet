import React from "react";
import {modes, themes} from "../../../schema";
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
import useRoom from "../../../Hooks/useRoom";
import QuestionBlock from "../../Common/QuestionBlock/QuestionBlock";
import {Icon20CancelCircleFillRed, Icon20CheckCircleFillGreen} from "@vkontakte/icons";
import {useTypedSelector} from "../../../Hooks/useTypedSelector";

const RoomPanel = () => {
    const {roomData, timer, callback} = useRoom()
    const {vkid} = useTypedSelector(s => s.user)
    const question = roomData.questions[roomData.activeQuestion]
    const answeredRight = (id: string) => question.answeredRight.indexOf(id) >= 0
    const answeredWrong = (id: string) => question.answeredWrong.indexOf(id) >= 0
    const didntAnswer = (id: string) => !(answeredRight(id) || answeredWrong(id))

    const badge = (id: string) => {
        if(typeof question === 'undefined') return <div/>
        if(answeredRight(id)) return <Icon20CheckCircleFillGreen/>
        if(answeredWrong(id)) return <Icon20CancelCircleFillRed/>
        if(didntAnswer(id)) return <div/>
    }

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
                    {roomData.players.map(v =>
                        <HorizontalCell key={v.ava} header={v.name}>
                            <Avatar src={v.ava} badge={badge(v.id)}/>
                        </HorizontalCell>)}
                </div>
            </HorizontalScroll>
        </Group>
        {roomData.activeQuestion >= 0 && <QuestionBlock
            type={'game'}
            question={question}
            disabled={!didntAnswer(vkid)}
            right={answeredRight(vkid)}
            callback={callback}/>}
        {roomData.activeQuestion < 0 && <FixedLayout vertical={'bottom'}>
                <Div style={{display: 'flex'}}><Button stretched size={'l'} loading={timer <= 0} disabled mode={"tertiary"}>{timer}</Button></Div>
            </FixedLayout>}
    </React.Fragment>
}

export default RoomPanel