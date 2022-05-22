import {PanelHeader} from "@vkontakte/vkui";
import './WelcomePanel.css'
import {WelcomeBack} from "./WelcomeBack";
import {ActionGrid} from "./ActionGrid";
import React from "react";
import Party from "./Party";

const WelcomePanel = () => {
    return <React.Fragment>
        <PanelHeader separator={false}/>
        <WelcomeBack/>
        <ActionGrid/>
        <Party/>
    </React.Fragment>
}

export default WelcomePanel