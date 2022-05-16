import {useEffect} from "react";
import bridge from "@vkontakte/vk-bridge";
import {useActions} from "./useActions";

const useBridge = () => {
    const {VKUI_AppearanceSet, UserSetVKID, UserSetAva, UserSetName} = useActions()
    useEffect(() => {
        bridge.subscribe(r => {
            switch (r.detail.type) {
                case 'VKWebAppUpdateConfig': VKUI_AppearanceSet(r.detail.data.scheme === 'space_gray' ? 'dark' : 'light')
                    break
                case 'VKWebAppGetUserInfoResult':
                    UserSetVKID(r.detail.data.id)
                    UserSetAva(r.detail.data.photo_200)
                    UserSetName(r.detail.data.first_name)
                    break
            }
        })

        bridge.send('VKWebAppInit').then(() => bridge.send('VKWebAppGetUserInfo'))
    }, [])
}

export default useBridge