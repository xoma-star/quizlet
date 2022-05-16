import React from "react"
import {Caption, HorizontalCell} from "@vkontakte/vkui";
//@ts-ignore
import style from '../../Stylesheets/IOSLikeIcon.module.css'

interface props {
    icon: React.ReactNode,
    header?: string,
    colorScheme?: 'blue' | 'violet' | 'purple' | 'yellow' | 'peach',
    onClick?: Function
}

export const IOSLikeIcon = ({icon, header, colorScheme, onClick}: props) => {
    const colorStyle = {
        color: `var(--soft_${colorScheme}_accent)`,
        backgroundColor: `var(--soft_${colorScheme}_background)`
    }
    return <HorizontalCell
        style={{margin: 'auto'}}
        size={'s'}
        header={<Caption style={{wordBreak: 'break-word'}} level={'1'} weight={'regular'}>{header}</Caption>}
        onClick={() => {
            if (onClick) onClick()
        }}
    >
        <div style={colorStyle} className={style.iconWrapper}>
            {icon}
        </div>
    </HorizontalCell>
}