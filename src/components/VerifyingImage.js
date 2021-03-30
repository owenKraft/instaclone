import React from 'react'
import Loading from './Loading'

const VerifyingImage = () => {

    return (
        <div id="verifying-image">
            <Loading 
                size = {15}
            />
            <p>Processing image...</p>
        </div>

    )
}

export default VerifyingImage