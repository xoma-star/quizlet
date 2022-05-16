import React, {useEffect} from 'react';
import {useTypedSelector} from "./Hooks/useTypedSelector";
import {
    AdaptivityProvider,
    AppRoot,
    ConfigProvider,
    SplitCol,
    SplitLayout,
    Root,
    View,
    Panel, ScreenSpinner, FixedLayout, Cell, Spinner, PanelHeader, PanelHeaderClose, Button, Div
} from "@vkontakte/vkui";
import getLast from "./Functions/getLast";
import {VKUI_Panels} from "./Redux/Reducers/vkui";
import WelcomePanel from "./Components/Panels/WelcomePanel/WelcomePanel";
import GameModePanel from "./Components/Panels/GameModePanel/GameModePanel";
import useBridge from "./Hooks/useBridge";
import useWS from "./Hooks/useWS";
import GameSearchPanel from "./Components/Panels/GameSearchPanel/GameSearchPanel";

const App = () => {
    const vkui = useTypedSelector(s => s.vkui)
    const server = useTypedSelector(s => s.server)
    useBridge()
    useWS()

    {/*@ts-ignore*/}
    return <ConfigProvider appearance={vkui.scheme}>
            {/*@ts-ignore*/}
            <AdaptivityProvider>
                <AppRoot>
                    <SplitLayout>
                        <Root activeView={'main'}>
                            <View activePanel={getLast(vkui.history).panel} id={'main'}>
                                <Panel id={VKUI_Panels.MAIN}><WelcomePanel/></Panel>
                                <Panel id={VKUI_Panels.GAME_MODE}><GameModePanel/></Panel>
                                <Panel id={VKUI_Panels.GAME_SEARCH}><GameSearchPanel/></Panel>
                                <Panel id={VKUI_Panels.ROOM}></Panel>
                            </View>
                        </Root>
                    </SplitLayout>
                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>
}

export default App;
