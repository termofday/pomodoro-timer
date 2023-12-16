import React from 'react';
import './App.css';

export default function App() {
  return (
  
      
      

        /*

        - break session not <= 0 or > 60
        - If the timer is running, the element with the id of time-left should display 
        the remaining time in mm:ss format 
        (decrementing by a value of 1 and updating the display every 1000ms).

        */
      


        <div>
        
        <div id="break-label">

        </div>

        <div id="session-label">

        </div>

        <div id="break-decrement"></div>

        <div id="session-decrement"></div>

        <div id="break-increment"></div>

        <div id="session-increment"></div>

        <div id="break-length"></div>

        <div id="sesseion-length"></div>

        <div id="timer-label"></div>

        <div id="time-left">mm:ss</div>

        <div id="start_stop"></div>
    
        <div id="reset"></div>

        </div>
      
    
  );
}