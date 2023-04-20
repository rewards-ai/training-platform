import React from 'react'
import { Slider, FormControl, InputLabel, Select, MenuItem, Stack } from '@mui/material'
import './Step2.css'

const Step2 = ({sessionJson, setSessionJson}) => {
  /*
  TODO:
    - get list of available models from backend
  */
 let models = [
    {'name': 'DQN', 'description': 'Deep Q-Network (DQN) is a deep reinforcement learning algorithm that uses a neural network to approximate the optimal action-value function, allowing for the learning of policies in complex and high-dimensional environments.'},
  ]

  let SX = {
    '.MuiOutlinedInput-notchedOutline': {borderColor: 'white'},
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#d7d755'},
    '&:hover .MuiOutlinedInput-notchedOutline': {borderColor: '#d7d755'},
    '.MuiSvgIcon-root ': {fill: "#d7d755 !important"},
    '&.MuiFormControl-root': {marginTop: '50px'}
  }

  let slider_sx = {
    '.MuiSlider-track': {color: '#d7d755'},
    '.MuiSlider-thumb': {color: '#d7d755'},
    '.MuiSlider-rail':  {color: '#555547'},
  }

  return (
    <div className='step2-container'>
      <div className='step2-algo-list'>
        <p>Choose Algorithm</p>
        {models.map((model, i) => {
          return (
            <>
              <label>
                <input type="radio" name="radio-buttons" value="dqn" checked
                  onChange={(e) => {setSessionJson({...sessionJson, "learning_algorithm": e.target.value})}}
                />
                {model['name']}
              </label>
            </>
          )
        })}
      </div>
      <div className='step2-parans-list-cont'>
        <div className='step2-params-list'>
          <Stack spacing={5}>
            <FormControl fullWidth sx={{}}>
              <InputLabel style={{color: 'white'}}>Choose Loss Function</InputLabel>
              <Select label="Choose Loss Function" style={{color: 'white'}} sx={SX} defaultValue={sessionJson["loss_fn"]}
                onChange={(e) => {setSessionJson({...sessionJson, "loss_fn": e.target.value})}}
              >
                <MenuItem key="loss_1" style={{color: 'white'}} value={'mse'}>Mean Squared Error (MSE)</MenuItem>
                <MenuItem key="loss_2" style={{color: 'white'}} value={'rmse'}>Root Mean Squared Error (RMSE)</MenuItem>
                <MenuItem key="loss_3" style={{color: 'white'}} value={'mae'}>Mean Absolute Error (MAE)</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel style={{color: 'white'}}>Choose Optimizer</InputLabel>
              <Select label="Choose Optimizer" style={{color: 'white'}} sx={SX} defaultValue={sessionJson["optimizer"]}
                onChange={(e) => {setSessionJson({...sessionJson, "optimizer": e.target.value})}}
              >
                <MenuItem key="optimizer_1" style={{color: 'white'}} value={'adam'}>Adam</MenuItem>
                <MenuItem key="optimizer_2" style={{color: 'white'}} value={'rmsprop'}>RMSprop</MenuItem>
                <MenuItem key="optimizer_3" style={{color: 'white'}} value={'adagrad'}>Adaptive Gradient Algorithm (Adagrad)</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </div>
      </div>
      <div className='step2-hyperparam-list-cont'>
        <div className='step2-hyperparam-list'>
          <p>Learning Rate</p>
          <Slider valueLabelDisplay='auto' defaultValue={sessionJson["learning_rate"]} sx={slider_sx}
            onChange={(e) => {setSessionJson({...sessionJson, "learning_rate": e.target.value})}}
            step={0.001} max={0.1} min={0.0001} style={{marginBottom: '30px'}}/>
          <p>Hidden Layer Size</p>
          <Slider valueLabelDisplay='auto' defaultValue={sessionJson["model_configuration"][0][1]} sx={slider_sx} max={81} min={3} style={{marginBottom: '30px'}}
            onChange={(e) => {setSessionJson({...sessionJson, "model_configuration": [[5, e.target.value], [e.target.value, 3]]})}}
          />
          <p>Number of Episodes</p>
          <Slider valueLabelDisplay='auto' defaultValue={sessionJson["num_episodes"]} sx={slider_sx} max={1000} min={10} style={{marginBottom: '30px'}}
            onChange={(e) => {setSessionJson({...sessionJson, "num_episodes": e.target.value})}}
          />
          <p>Gamma</p>
          <Slider valueLabelDisplay='auto' defaultValue={sessionJson["gamma"]} sx={slider_sx} step={0.01} 
            max={1} min={0} style={{marginBottom: '30px'}}
            onChange={(e) => {setSessionJson({...sessionJson, "gamma": e.target.value})}}/>
          <p>Epsilon</p>
          <Slider valueLabelDisplay='auto' defaultValue={sessionJson["epsilon"]} sx={slider_sx} max={100} min={1} style={{marginBottom: '30px'}}
            onChange={(e) => {setSessionJson({...sessionJson, "epsilon": e.target.value})}}
          />
        </div>
      </div>
    </div>
  )
}

export default Step2