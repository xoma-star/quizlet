import { useTypedSelector } from "./useTypedSelector"
import {useActions} from "./useActions";

const useCached = () => {
    const now = Date.now()
    const { cached, socket } = useTypedSelector(s => s.server)
    const { UpdateCache } = useActions()
    const availableThemes = cached.themesAvailable.value

    const selectedThemes = cached.themesSelected.value
    if(selectedThemes.length === 0 && cached.themesSelected.updated < 1) {
        UpdateCache({themesSelected: {updated: 1, value: selectedThemes, refresh: 0}})
        socket?.emit('getPreferredThemes', (data: string[]) => {
            UpdateCache({themesSelected: {updated: now, value: data, refresh: 0}})
        })
    }

    return {
        themesAvailable: availableThemes,
        themesSelected: selectedThemes,
        modesSelected: cached.modesSelected.value
    }
}

export default useCached