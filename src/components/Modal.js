import React from 'react'

const Modal = (props) => {
    let display
    if(props.displayOnLoad === true){
        display = "flex"
    } else {
        display = "none"
    }

    const closeModal = (e) => {
        const thisModal = e.target.closest(".modal")
        thisModal.style.display = "none"
    }

    window.onclick = function(e) {
        const thisModal = e.target.closest(".modal")
        if (e.target === thisModal && props.allowClose !== false) {
          thisModal.style.display = "none";
        }
      }
    
    return (
        <div id={props.id} className="modal" style={{display: display}}>
            <div className="modal-content">
                {props.content}
            </div>
        </div>
    )
}

export default Modal