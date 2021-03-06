import React from 'react';
import {useTypedSelector} from "./Hooks/useTypedSelector";
import {
    AdaptivityProvider,
    AppRoot,
    ConfigProvider,
    SplitLayout,
    Root,
    View,
    Panel
} from "@vkontakte/vkui";
import getLast from "./Functions/getLast";
import {VKUI_Panels} from "./Redux/Reducers/vkui";
import WelcomePanel from "./Components/Panels/WelcomePanel/WelcomePanel";
import GameModePanel from "./Components/Panels/GameModePanel/GameModePanel";
import useBridge from "./Hooks/useBridge";
import useWS from "./Hooks/useWS";
import GameSearchPanel from "./Components/Panels/GameSearchPanel/GameSearchPanel";
import RoomPanel from "./Components/Panels/RoomPanel/RoomPanel";

const App = () => {
    const vkui = useTypedSelector(s => s.vkui)
    useBridge()
    useWS()

    /*@ts-ignore*/
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
                                <Panel id={VKUI_Panels.ROOM}><RoomPanel/></Panel>
                            </View>
                        </Root>
                    </SplitLayout>
                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>
}

export default App;
