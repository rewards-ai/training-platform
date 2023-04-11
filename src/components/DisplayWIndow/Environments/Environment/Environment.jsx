import { useState } from "react"
import React from 'react'
import "./Environment.css"

const Environment = ({i, env, curEnv, setCurEnv, sessionJson, setSessionJson}) => {

    function handleOnClick(e) {
        env["isReleased"] ? setCurEnv(i) : {}
        setSessionJson({...sessionJson, "environment_name": "car-race"})
    }

    return (
        <div className='environment'>
            {/* <img className="env-image" src={env["thumbnail"]} /> */}
            <div className={`env-image ${i === curEnv ? 'outlined' : ''}`}
                onClick={handleOnClick}
                style={env["isReleased"] ? {} : {filter: 'brightness(0.5)'}}
                />
            <div className="env-description">
                <p className='env-name'>{env["name"]} {env["isReleased"] ? "" : " (Coming Soon!)"}</p>
                <div className='env-details-cont'>
                    <p className='env-desc'>{env["description"]}</p>
                    <a className='env-link' href={env["link"]} >View More</a>
                </div>
            </div>
        </div>
    )
}

export default Environment