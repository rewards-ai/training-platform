import React, {useState, useEffect} from 'react'
import "./TrainWindow.css"
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
import { Line } from 'react-chartjs-2';
import ReactJson from 'react-json-view';

const TrainWindow = ({session_id, setIsTraining}) => {
  const rewards_api = axios.create({baseURL: import.meta.env.VITE_REWARDS_API})
  const [plotData, setData] = useState({"plot_scores": [], "plot_mean_scores": []});
  const [jsonData, setJsonData] = useState()

  useEffect(() => {
    rewards_api.get(`/get_all_params?session_id=${session_id}`)
    .then((response) => {
      setJsonData(response.data)
    })
  })

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch('src/assets/temp.json')
        .then(response => response.json())
        .then(json => {
          setData(json);
        });
    }, 10);
    return () => clearInterval(intervalId);
  }, []);
  

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div className='training-window'>
      <div className='training-window-inner'>
        <img id="image" src={`${import.meta.env.VITE_STREAM_API}/stream?session_id=${session_id}`}/>
        <div className='training-window-controller'>
          <div className='training-window-map'>
            <Line options={chartOptions} data={{
                labels: Array.from({length: plotData["plot_scores"].length}, (_, index) => (index+1)),
                datasets: [
                  {
                    label: 'Scores',
                    data: plotData["plot_scores"],
                    fill: false,
                    borderColor: 'white',
                    tension: 0.1,
                    borderWidth: 2
                  }
                ]
            }} />
          </div>
          <div style={{margin: "10px 0px", width: "100%", overflowY: "scroll", overflowX: "hidden", height: "calc(50% - 60px)"}}>
            <ReactJson style={{width:"100%"}} src={jsonData} theme="chalk" iconStyle='circle' />
          </div>
            <button style={{width: "100%"}} className='styled-button' onClick={() => {
              setIsTraining(false)
              window.location.reload()
            }
            } >Exit</button>
        </div>
      </div>
    </div>
  )
}

export default TrainWindow