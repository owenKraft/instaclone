import React from 'react'
import MoonLoader from "react-spinners/MoonLoader";


const Loading = (props) => {
    return (
        <div className="loading">
            <MoonLoader color={"#8E8E8E"} loading={"true"} size={props.size} />
        </div>
    )
}

export default Loading