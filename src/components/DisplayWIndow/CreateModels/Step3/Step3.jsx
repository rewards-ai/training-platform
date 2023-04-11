import React, {useState} from 'react'
import './Step3.css'
import CodeEditor from '@uiw/react-textarea-code-editor';

const Step3 = ({sessionJson, setSessionJson}) => {
  return (
    <div className='step3-container'>
      <div className='step3-editor-container'>
        <p>Enter Reward Function</p>
        <CodeEditor
          className='code-editor'
          value={sessionJson["reward_function"]}
          language="py"
          onChange={(e) => {
            setSessionJson({...sessionJson, "reward_function": e.target.value})
          }}
          padding={20}
        />
      </div>
    </div>
  )
}

export default Step3