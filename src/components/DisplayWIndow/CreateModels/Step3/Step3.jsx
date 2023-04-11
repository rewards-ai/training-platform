import React, {useState} from 'react'
import './Step3.css'
import CodeEditor from '@uiw/react-textarea-code-editor';

const Step3 = ({sessionJson, setSessionJson}) => {
  const [code, setCode] = React.useState(
    `def reward_function(params):
    reward = 0

    return rewards
    `
  )
  return (
    <div className='step3-container'>
      <div className='step3-editor-container'>
        <p>Enter Reward Function</p>
        <CodeEditor
          className='code-editor'
          value={code}
          language="py"
          onChange={(e) => {
            setCode(e.target.value)
            setSessionJson({...sessionJson, "reward_function": e.target.value})
          }}
          padding={20}
        />
      </div>
    </div>
  )
}

export default Step3