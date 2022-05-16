import {Card, CardGrid, Group, HorizontalCell, HorizontalScroll, InitialsAvatar} from "@vkontakte/vkui";
import {IOSLikeIcon} from "../../Common/IOSLikeIcon";
import {Icon24BrainOutline, Icon24CupOutline, Icon24GameOutline} from "@vkontakte/icons";
import {useActions} from "../../../Hooks/useActions";
import {VKUI_Panels} from "../../../Redux/Reducers/vkui";
import {useTypedSelector} from "../../../Hooks/useTypedSelector";

export const ActionGrid = () => {
    const {VKUI_HistoryPush} = useActions()
    const {socket} = useTypedSelector(s => s.server)
    return <Group>
        <CardGrid size={'s'}>
            {/*<Card>*/}
                {socket && <IOSLikeIcon
                    header={'Играть'}
                    colorScheme={"peach"}
                    onClick={() => VKUI_HistoryPush({view: 'main', panel: VKUI_Panels.GAME_MODE})}
                    icon={<Icon24GameOutline/>}/>}
            {/*</Card>*/}
            {/*<Card>*/}
                {socket && <IOSLikeIcon header={'Помочь'} colorScheme={"blue"} icon={<Icon24BrainOutline/>}/>}
            {/*</Card>*/}
            {/*<Card>*/}
                {socket && <IOSLikeIcon header={'Рейтинг'} colorScheme={"violet"} icon={<Icon24CupOutline/>}/>}
            {/*</Card>*/}
        </CardGrid>
    </Group>
}