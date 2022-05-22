import {Button, Div, FixedLayout, PanelHeader, PanelHeaderClose} from "@vkontakte/vkui";
import React from "react";
import {useActions} from "../../../Hooks/useActions";
import {useTypedSelector} from "../../../Hooks/useTypedSelector";

const GameSearchPanel = () => {
    const {VKUI_HistoryBack} = useActions()
    const {socket} = useTypedSelector(s => s.server)
    const {vkid} = useTypedSelector(s => s.user)
    return <React.Fragment>
        <PanelHeader separator={false} left={<PanelHeaderClose onClick={() => {
            socket?.emit('exitQueue', {id: vkid})
            VKUI_HistoryBack()
        }}/>}/>
        <FixedLayout vertical={'bottom'}>
            <Div>
                <Button stretched mode={'tertiary'}>Поиск игры...</Button>
            </Div>
        </FixedLayout>
    </React.Fragment>
}

export default GameSearchPanel