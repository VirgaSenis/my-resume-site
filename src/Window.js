import React from 'react';
import './css/Window.css';

function Window(props) {
    return (
        <dialog className='Window' open={props.openWindow}>
            <div className='Menubar'>
                <button className='Btn-close' onClick={props.onCloseBtnClick}>X</button>
            </div>
            <div className='Content'>
                {props.content}
            </div>
        </dialog>
    )
}

export default Window;