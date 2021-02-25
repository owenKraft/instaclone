const Utilities = () => {
    function truncateText(str, clickFunction, length, ending){
        if (length == null) {
            length = 100;
        }

        if (ending == null){
            ending =    <span className="more-text" onClick={clickFunction}>
                            ... more
                        </span>
        }
        if (str.length > length) {
            const newStr = str.substring(0, length - 5)
            return <span>{newStr} {ending}</span>
        } else {
            return str;
        }
    }

    return {
        truncateText
    }
}

export default Utilities