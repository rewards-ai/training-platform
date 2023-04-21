import './App.css'
import DisplayWindow from './components/DisplayWIndow/DisplayWindow'
import Navbar from './components/Navbar/Navbar'
import { useState } from 'react'

function App() {
  const [isWin, setIsWin] = useState(0)

  return (
    <div className="App">
      <Navbar isWin={isWin} setIsWin={setIsWin} />
      <DisplayWindow isWin={isWin} setIsWin={setIsWin}/>
    </div>
  )
}

export default App


// import React, { useState } from 'react';
// // import './styles.css';

// const App = () => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   const handleMouseMove = (event) => {
//     setMousePosition({
//       x: event.clientX,
//       y: event.clientY
//     });
//   };

//   const getBlockStyle = (index) => {
//     const left = Math.floor(Math.random() * window.innerWidth);
//     const top = Math.floor(Math.random() * window.innerHeight);
//     const speed = index % 2 === 0 ? 'fast' : 'slow';

//     return {
//       left: `${left}px`,
//       top: `${top}px`,
//       animation: `${speed} 1s infinite alternate ease-in-out`,
//     };
//   };

//   const blocks = Array.from({ length: 10 }).map((_, index) => (
//     <div key={index} className="block" style={getBlockStyle(index)} />
//   ));

//   return (
//     <div className="container" onMouseMove={handleMouseMove}>
//       {blocks}
//       <div className="text-wrapper">
//         <h1 className="text">rewards.ai</h1>
//       </div>
//       <style>
//         {`
//           body {
//             margin: 0;
//             padding: 0;
//             background-color: black;
//             color: white;
//           }

//           .container {
//             position: relative;
//             height: 100vh;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             overflow: hidden;
//           }

//           .block {
//             position: absolute;
//             width: 30px;
//             height: 30px;
//             background-color: yellow;
//             opacity: 0.7;
//             border-radius: 50%;
//           }

//           .fast {
//             animation-duration: 0.3s;
//           }

//           .slow {
//             animation-duration: 0.7s;
//           }

//           .text-wrapper {
//             position: relative;
//             z-index: 1;
//             text-align: center;
//           }

//           .text {
//             font-size: 5rem;
//             font-weight: bold;
//             margin: 0;
//             text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
//             transition: transform 0.7s ease-out;
//           }

//           @media (max-width: 768px) {
//             .text {
//               font-size: 3rem;
//             }
//           }
//         `}
//       </style>
//       <style>
//         {`
//           .fast {
//             animation-name: fast;
//           }

//           .slow {
//             animation-name: slow;
//           }

//           @keyframes fast {
//             0% {
//               transform: translate(0, 0);
//             }
//             100% {
//               transform: translate(${mousePosition.x / 30}px, ${mousePosition.y / 30}px);
//             }
//           }

//           @keyframes slow {
//             0% {
//               transform: translate(0, 0);
//             }
//             100% {
//               transform: translate(${mousePosition.x / 70}px, ${mousePosition.y / 70}px);
//             }
//           }

//           .text {
//             transform: translate(${mousePosition.x / 100}px, ${mousePosition.y / 100}px);
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default App;



