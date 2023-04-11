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
                <input type="radio" name="radio-buttons" value="dqn"
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
              <Select label="Choose Loss Function" style={{color: 'white'}} sx={SX}
                onChange={(e) => {setSessionJson({...sessionJson, "loss_fn": e.target.value})}}
              >
                <MenuItem style={{color: 'white'}} value={'MSE'}>Mean Squared Error (MSE)</MenuItem>
                <MenuItem style={{color: 'white'}} value={'RMSE'}>Root Mean Squared Error (RMSE)</MenuItem>
                <MenuItem style={{color: 'white'}} value={'MAE'}>Mean Absolute Error (MAE)</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel style={{color: 'white'}}>Choose Optimizer</InputLabel>
              <Select label="Choose Optimizer" style={{color: 'white'}} sx={SX}
                onChange={(e) => {setSessionJson({...sessionJson, "optimizer": e.target.value})}}
              >
                <MenuItem style={{color: 'white'}} value={'adam'}>Adam</MenuItem>
                <MenuItem style={{color: 'white'}} value={'rmsprop'}>RMSprop</MenuItem>
                <MenuItem style={{color: 'white'}} value={'adagrad'}>Adaptive Gradient Algorithm (Adagrad)</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </div>
      </div>
      <div className='step2-hyperparam-list-cont'>
        <div className='step2-hyperparam-list'>
          <p>Learning Rate</p>
          <Slider valueLabelDisplay='auto' defaultValue={60} sx={slider_sx}
            onChange={(e) => {setSessionJson({...sessionJson, "learning_rate": e.target.value / 10000})}}
            valueLabelFormat={(e)=>{return((e/10000))}} max={100} min={1} style={{marginBottom: '30px'}}/>
          <p>Hidden Layer Size</p>
          <Slider valueLabelDisplay='auto' defaultValue={9} sx={slider_sx} max={81} min={3} style={{marginBottom: '30px'}}
            onChange={(e) => {setSessionJson({...sessionJson, "model_configuration": [[5, e.target.value], [e.target.value, 3]]})}}
          />
          <p>Number of Episodes</p>
          <Slider valueLabelDisplay='auto' defaultValue={700} sx={slider_sx} max={2000} min={100} style={{marginBottom: '30px'}}
            onChange={(e) => {setSessionJson({...sessionJson, "num_episodes": e.target.value})}}
          />
          <p>Gamma</p>
          <Slider valueLabelDisplay='auto' defaultValue={90} sx={slider_sx} max={100} min={1} style={{marginBottom: '30px'}}
            onChange={(e) => {setSessionJson({...sessionJson, "gamma": e.target.value})}}
          />
          <p>Epsilon</p>
          <Slider valueLabelDisplay='auto' defaultValue={20} sx={slider_sx} max={100} min={1} style={{marginBottom: '30px'}}
            onChange={(e) => {setSessionJson({...sessionJson, "epsilon": e.target.value})}}
          />
        </div>
      </div>
    </div>
  )
}

export default Step2