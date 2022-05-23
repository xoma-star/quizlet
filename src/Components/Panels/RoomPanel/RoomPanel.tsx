import React from "react";
import {
    Button, Counter,
    Div,
    FixedLayout,
    PanelHeader
} from "@vkontakte/vkui";
import useRoom from "../../../Hooks/useRoom";
import QuestionBlock from "../../Common/QuestionBlock/QuestionBlock";
import {Icon20CancelCircleFillRed, Icon20CheckCircleFillGreen} from "@vkontakte/icons";
import {useTypedSelector} from "../../../Hooks/useTypedSelector";
import RoomHeader from "./RoomHeader";
import UsersRow, {IUsers} from "../../Common/UsersRow/UsersRow";
import {useActions} from "../../../Hooks/useActions";

const RoomPanel = () => {
    const {roomData, timer, callback, question, players, answeredRightCount} = useRoom()
    const {vkid} = useTypedSelector(s => s.user)
    const {VKUI_HistoryClear} = useActions()
    const answeredRight = (id: string) => question ? question.answeredRight.indexOf(id) >= 0 : false
    const answeredWrong = (id: string) => question ? question.answeredWrong.indexOf(id) >= 0 : false
    const didntAnswer = (id: string) => !(answeredRight(id) || answeredWrong(id))

    const gameRunning = roomData.questions.length === 0 && question
    const gameEnded = !gameRunning && question

    const badge = (id: string) => {
        if(!question) return <div/>
        if(gameEnded) return <Counter size="s">{answeredRightCount(id)}</Counter>
        if(answeredRight(id)) return <Icon20CheckCircleFillGreen/>
        if(answeredWrong(id)) return <Icon20CancelCircleFillRed/>
        if(didntAnswer(id)) return false
    }

    return <React.Fragment>
        <PanelHeader separator={false}/>
        <RoomHeader roomData={roomData}/>
        <UsersRow users={players.map(v => {return {...v, badge: gameRunning || gameEnded ? badge(v.id) : false} as IUsers})}/>
        {gameRunning && <QuestionBlock
            type={'game'}
            question={question}
            disabled={!didntAnswer(vkid)}
            right={answeredRight(vkid)}
            callback={callback}/>}
        {gameEnded && roomData.questions.map(v => <QuestionBlock
            type={'check'}
            question={v}
            disabled={true}/>)}
        {gameEnded && <Div style={{display: 'flex'}}>
            <Button stretched size={'l'} mode={'primary'} onClick={VKUI_HistoryClear}>На главную</Button>
        </Div>}
        {!question && <FixedLayout vertical={'bottom'}>
                <Div style={{display: 'flex'}}><Button stretched size={'l'} loading={timer <= 0} disabled mode={"tertiary"}>{timer}</Button></Div>
            </FixedLayout>}
    </React.Fragment>
}

export default RoomPanel