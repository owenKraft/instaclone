import React, {useEffect} from 'react'

const ViewAllComments = (props) => {
    const displayComponent = props.display

    // useEffect(() => {
    //     console.log(props.comments)
    // },[props.length])

    return (
        displayComponent && props.length > 0 && (
            <button className="view-all-comments" onClick={props.displayAllComments}>View all {props.length} comments</button>
        )
    )
}

export default ViewAllComments