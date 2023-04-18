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

const TrainWindow = ({session_id, setIsTraining}) => {
  const stream_api = axios.create({baseURL: import.meta.env.VITE_STREAM_API})
  const [plotData, setData] = useState({"plot_scores": [], "plot_mean_scores": []});

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch('src/assets/temp.json')
        .then(response => response.json())
        .then(json => {
          console.log(json)
          setData(json);
        });
    }, 10);
    return () => clearInterval(intervalId);
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        ticks: {
          fontColor: '#fff'
        },
      }],
      yAxes: [{
        ticks: {
          fontColor: '#fff'
        },
      }],
    },
  };

  return (
    <div className='training-window'>
      <div className='training-window-inner'>
        <img id="image" src={`${import.meta.env.VITE_STREAM_API}/stream?id=${session_id}`}/>
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
          <div className=''>    
            <button onClick={() => {
              stream_api.get("/stop")
              setIsTraining(false)}
            } >Exit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrainWindow