import React from 'react'
import SaveIcon from '../resources/icons/save_icon.png'
import SaveIconSelected from '../resources/icons/save_filled_icon.png'
import CommentIcon from '../resources/icons/comment_icon.png'
import ShareIcon from '../resources/icons/share_icon.png'
import LikeIcon from '../resources/icons/heart_icon.png'
import LikeIconSelected from '../resources/icons/heart_filled_icon.png'

const EngagementIcon = (props) => {
    const imgObj = {
        save: {unselected: SaveIcon, selected: SaveIconSelected},
        comment: {unselected: CommentIcon},
        share: {unselected: ShareIcon},
        like: {unselected: LikeIcon, selected: LikeIconSelected}
    }

    let selected

    if(props.selected){
        selected = "selected"
    } else {
        selected = "unselected"
    }

    const selectedIcon = imgObj[props.icon][selected] || ""
    const src = selectedIcon

    const clickFunction = props.clickFunction || function(e){}

    return (
        <img src={src} className={`post-icon ${props.className}`} alt={props.icon} onClick={(e) => clickFunction(e)}/>
    )
}

export default EngagementIcon