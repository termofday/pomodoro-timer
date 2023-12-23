'use strict'

import React from 'react';
import './App.css';
import Timer from './component/timer';

export default function App() {



  return (

        <div className='h-vh'>
        
          <Timer />
        
          <div className='mt-20 text-center font-bold text-white opacity-60 hover:opacity-100'>
            <div>Tech: HTML | CSS/TailwindCSS | JavaScript/React | ServiceWorker/Workbox</div>
            <div>Created by</div>
            <div><a href="https://haustein.in">Hendrik Haustein</a></div>
          </div>
      </div>
      
    
  );
}