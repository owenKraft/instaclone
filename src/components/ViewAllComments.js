import React from 'react'

const ViewAllComments = (props) => {
    const displayComponent = props.display

    return (
        displayComponent && (
            <button className="view-all-comments" onClick={props.displayAllComments}>View all {props.length} comments</button>
        )
    )
}

export default ViewAllComments