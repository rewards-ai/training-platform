import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ReactJson from 'react-json-view'
import CodeEditor from '@uiw/react-textarea-code-editor';
import "./SessionInfo.css"

const SessionInfo = ({session_id}) => {
    const rewards_api = axios.create({baseURL: import.meta.env.VITE_REWARDS_API})
    const [data, setData] = useState()

    useEffect(() => {
        rewards_api.get(`/get_all_params?session_id=${session_id["session_id"]}`)
        .then((response) => {
            setData(response.data)
        })
        
    }, [])
    
    return (
        <>
        {data && <div className='session-info-cont'>
            <p>Configs</p>
            <div className='session-info-cont-sec1' >
                <ReactJson src={data} theme="chalk" iconStyle='circle' />
                <CodeEditor
                    disabled={true}
                    id='code-editor1'
                    className='code-editor'
                    value={data["training_params"]["reward_function"]}
                    language="py"
                    padding={20}
                    style={{width: "50%"}}
                />
            </div>
        </div>}
        </>
    )
}

export default SessionInfo