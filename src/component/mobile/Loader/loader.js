import React from 'react'
import style from './component.css';

const Loader = () => {
    return (
            <div className={`${style.loader}`}>
                <span></span>
                <span></span>
                <span></span>
            </div>
    )
}

export default Loader