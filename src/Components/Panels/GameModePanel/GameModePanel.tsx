import {
    Button,
    Cell,
    Div,
    Group,
    Header,
    PanelHeader,
    PanelHeaderBack,
    Spinner
} from "@vkontakte/vkui";
import React, {useEffect, useState} from "react";
import {useActions} from "../../../Hooks/useActions";
import {useTypedSelector} from "../../../Hooks/useTypedSelector";
import useCached from "../../../Hooks/useCached";
import {VKUI_Panels} from "../../../Redux/Reducers/vkui";
import {modes} from "../../../schema";

interface props{

}

const GameModePanel = ({}: props) => {
    const {VKUI_HistoryBack, UpdateCache, VKUI_HistoryPush} = useActions()
    const { socket } = useTypedSelector(s => s.server)
    const { themesAvailable, themesSelected, modesSelected} = useCached()
    const [loading, setLoading] = useState(false)

    const startGame = () => {
        setLoading(true)
        socket?.emit('queue', {modesSelected: modesSelected, themesSelected: themesSelected}, () => VKUI_HistoryPush({view: 'main', panel: VKUI_Panels.GAME_SEARCH}))
    }

    const clickHandler = (e: React.FormEvent<HTMLElement>, id: string, modes = false) => {
        let a = modes ? [...modesSelected] : [...themesSelected]
        const b = a.findIndex(x => id === x)
        if(b < 0) a.push(id)
        else a.splice(b, 1)
        if(modes) UpdateCache({modesSelected: {updated: 0, value: a, refresh: 0}})
        else UpdateCache({themesSelected: {updated: Date.now(), value: a, refresh: 600}})
    }

    const buttonInactiveState = loading || themesSelected.length === 0
    return <React.Fragment>
        <PanelHeader left={<PanelHeaderBack onClick={VKUI_HistoryBack}/>}>
            Поиск игры
        </PanelHeader>
        <Group header={<Header mode={'secondary'}>Режим игры</Header>}>
            {modes.map(v => <Cell
                key={v.id}
                mode={'selectable'}
                checked={modesSelected.indexOf(v.id) >= 0}
                onChange={e => clickHandler(e, v.id, true)}
            >{v.name}</Cell>)}
        </Group>
        <Group header={<Header mode={'secondary'}>Темы</Header>}>
            {themesAvailable.length === 0 && <Spinner size={'regular'}/>}
            {themesAvailable.map(v => <Cell
                    key={`${v.id}`}
                    checked={themesSelected.indexOf(v.id) >= 0}
                    onChange={e => clickHandler(e, v.id)}
                    mode={'selectable'}>{v.name}</Cell>)}
        </Group>
        <Div>
            <Button
                disabled={buttonInactiveState}
                loading={loading}
                onClick={startGame}
                stretched
                size={'l'}>Поиск игры</Button>
        </Div>
    </React.Fragment>
}

export default GameModePanel