import {Button, Div, FixedLayout, PanelHeader, PanelHeaderClose} from "@vkontakte/vkui";
import React, { useEffect } from "react";
import { useActions } from "../../../Hooks/useActions";
import QuestionBlock from "../../Common/QuestionBlock/QuestionBlock";
import {QuestionType} from "../../../schema";
import {useTypedSelector} from "../../../Hooks/useTypedSelector";

const sampleQuestion: QuestionType = {
    type: 'enter',
    text: 'Введите фамилию Обамы',
    answer: 'nigger',
    time: 30
}

const sample2: QuestionType = {
    type: 'select',
    text: 'Гнидой был Ленин. А кто еще был пидором?',
    time: 10,
    answers: [
        {text: 'Пыня', right: true},
        {text: 'Сталин', right: false},
        {text: 'Пушник', right: false},
        {text: 'GAME_SEARCH', right: false}
    ]
}

const GameSearchPanel = () => {
    const {VKUI_HistoryBack} = useActions()
    return <React.Fragment>
        <PanelHeader separator={false} left={<PanelHeaderClose onClick={VKUI_HistoryBack}/>}/>
        <QuestionBlock question={sample2} type={'waiting'}/>
        <FixedLayout vertical={'bottom'}>
            <Div>
                <Button stretched mode={'tertiary'}>Поиск игры...</Button>
            </Div>
        </FixedLayout>
    </React.Fragment>
}

export default GameSearchPanel