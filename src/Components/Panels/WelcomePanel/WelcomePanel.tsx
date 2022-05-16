import {
    Cell,
    FixedLayout, Group, Header,
    HorizontalCell,
    HorizontalScroll,
    InitialsAvatar,
    Panel,
    PanelHeader,
    Spinner
} from "@vkontakte/vkui";
import './WelcomePanel.css'
import {WelcomeBack} from "./WelcomeBack";
import {ActionGrid} from "./ActionGrid";
import React from "react";
import Party from "./Party";

interface props{

}

const WelcomePanel = ({}: props) => {
    return <React.Fragment>
        <PanelHeader separator={false}/>
        <WelcomeBack/>
        <ActionGrid/>
        <Party/>
    </React.Fragment>
}

export default WelcomePanel