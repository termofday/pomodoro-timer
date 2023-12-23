import React, { useState, useEffect, useReducer } from "react";
import Reducer from "./reducer";

import useSound from 'use-sound'
import mySound from '../beep.wav' // Your sound file path here

// adds zero; e.q. 9:9 will be 09:09
const addZero = (i) =>
{
    if(i < 10)
    {
        i = '0' + i
    }
    return i;
}

        // init state
        const initState = {
            timer: 25,
            breaker: 5,
            start_stop: false
        }
        // now
        let now = Date.now();
        console.log(now)
        // future/deadline
        const stateNum =  initState.timer * 60 * 1000;
        // now + deadline
        let timeFuture = now + stateNum;  
             

export default function Timer(props)
{
    // handler reducer state
    const [state, dispatch] = useReducer(Reducer, initState);
    // the real time since countdown start, will increase, then when match with var timeFuture it will help to stop the countdown immatdely
    const [timeNow, setTimeNow] = useState(now);
    // the countdown time
    const [time, setTime] = useState(state.timer * 60 * 1000);
    // will be set true/false, if user tick the start-stop button in app.js
    const [isRun, setIsRun] = useState(false);
    // is session or break
    const [isSession, setIsSession] = useState(true)
    // sound hook
    const [playSound] = useSound(mySound)

        /**
         * 
         * @param {a} a gives the props for action.type, so the dispatch can in reducer.js works with it.
         */
        const handleClick = (a) =>
        {
            // increase / decrease timer
            if (a === 'INC' && state.timer < 60 && state.start_stop === false) 
            {
                dispatch({ type: 'INCREASE_TIMER' }); 
            } 
            else if (a === 'DEC' && state.timer > 1 && state.start_stop === false) 
            {
                dispatch({ type: 'DECREASE_TIMER' });
            }
                    // increase / decrease break timer
                    if(a === 'B_INC' && state.breaker < 60 && state.start_stop === false)
                    {
                        dispatch({ type: 'B_INCREASE_TIMER' });
                    }
                    else if(a === 'B_DEC' && state.breaker > 1 && state.start_stop === false)
                    {
                        dispatch({ type: 'B_DECREASE_TIMER' });
                    } 
                            // start & stop timer
                            if(a === 'START_STOP')
                            {
                                console.log("dispatch start-stop", state.start_stop)
                                dispatch({ type: 'START_STOP' })
                            }
                                // reset timer
                                if(a === 'RESET')
                                {
                                    
                                    console.log("dispatch reset")
                                    dispatch({ type: 'RESET' })

                                    setTime(state.timer * 60 * 1000)
                                   /*
                                    now = Date.now()
                                    setTimeNow(now)
                                    timeFuture = now + state.timer * 1 * 1000
                                    */
                                    setIsSession(true) 
                                } 
        }

        useEffect(() =>
        {
            console.log("state wechsel", state)
            setTime(state.timer * 60 * 1000)

            // fast bug fix; timer shows 00:00 instead 60:00

            if(state.timer > 59)
            {
                setTime(59 * 60 * 1000)
            }
            if(state.breaker > 59)
            {
                setTime(59 * 60 * 1000)
            }

            now = Date.now()
            setTimeNow(now)
            timeFuture = now + state.timer * 60 * 1000
       
        }, [state.timer, state.breaker])

        // useEffect can be in depencie of states but props too.
        useEffect(() =>
            {   
                
                // was run true/false in depencie from props
                console.log("useEffect", state.start_stop)
                setIsRun(state.start_stop)
            }, [state.start_stop])

                    // useEffect for the interval, to run nearly smooth
                    useEffect(() =>
                    {
                        // change dynamical the title-tag
                        document.title = addZero(new Date(time).getMinutes()) + ':' + addZero(new Date(time).getSeconds()) + ' Focus'

                        if(isRun)
                        {
                            const interval = setInterval(() => 
                            {
                                // uses JS Date() because the countdown is then trustfulier
                                // prevTime callback safer than regular states
                                setTimeNow(prevTime => prevTime + 1 * 1000)
                                setTime(prevTime => prevTime - 1 * 1000) 

                                    console.log(new Date(timeNow))
                            
                                        // check if past present and present (future) are meeting eachother, so the countdown ends!
                                        // timeNow >= timeFuture
                                        // time < 0

                                        if(time <= 2)
                                        {
                                            playSound();
                                        }

                                        if(timeNow >= timeFuture || time <= 0)
                                        {
                                            console.log("ende", timeNow);

                                            playSound();

                                            clearInterval(interval);
                                            handleClick('START_STOP');

                                            // load the next rounds
                                            now = Date.now()
                                            setTimeNow(now)
                                            timeFuture = now + state.timer * 60 * 1000
                                            if(isSession)
                                            {
                                                setTime(state.breaker * 60 * 1000)
                                                setIsSession(false);
                                                handleClick('START_STOP');
                                            }
                                            else
                                            {
                                                setTime(state.timer * 60 * 1000)
                                                setIsSession(true);
                                                handleClick('START_STOP');
                                            }   
                                        }
                            }, 1000);

                            return () => {
                                clearInterval(interval);
                            }
                        }
                    }, [isRun, timeNow, isSession, state.breaker, state.timer]);


    return (
        <div className="text-white mt-4">

            <diV className="shadow-xl flex justify-center text-center text-xl font-extrabold p-5 bg-slate-700 rounded-md mr-2 ml-2 sm:mr-28 sm:ml-28 md:mr-44 md:ml-44">
                
                <div className="w-1/2">    
                    <div id="break-label">
                        <p>Break</p>
                    </div>

                    <div id="break-length">
                        <p>{state.breaker} minutes</p>
                    </div>

                    <div id="break-decrement">
                        <button className="text-3xl bg-slate-600 mt-2 p-4 hover:bg-slate-500 rounded-lg" onClick={() => handleClick('B_INC')}>+</button>
                    </div>

                    <div id="break-increment">
                        <button className="text-3xl bg-slate-600 mt-2 p-5 hover:bg-slate-500 rounded-lg" onClick={() => handleClick('B_DEC')}>-</button>
                    </div>
                </div>
                <div className="w-1/2">
                    <div id="session-label">
                        <p>Session</p>
                    </div>

                    <div id="session-length">
                        <p>{state.timer} minutes</p>
                    </div>

                    <div id="session-increment">
                        <button className="text-3xl bg-slate-600 mt-2 p-4 hover:bg-slate-500 rounded-lg" onClick={() => handleClick('INC')}>+</button>
                    </div>

                    <div id="session-decrement">
                        <button className="text-3xl bg-slate-600 mt-2 p-5 hover:bg-slate-500 rounded-lg" onClick={() => handleClick('DEC')}>-</button>
                    </div>
                </div>
            </diV>

            <div className="shadow-xl text-center mt-3 rounded-md bg-slate-700 p-1 mr-2 ml-2 pt-8 pb-8 mr-2 ml-2 sm:mr-28 sm:ml-28 md:mr-44 md:ml-44">
                <div className="text-2xl font-extrabold" id="timer-label">Time left: {isSession ? 'Session' : 'Break'}</div>

                <div id="time-left" className="text-8xl font-extrabold">
                    {
                        addZero(new Date(time).getMinutes()) + ':' + addZero(new Date(time).getSeconds())
                    }
                </div>
            </div>

            <div className="text-center">
                <div id="start_stop">
                    <button className="shadow-xl mt-20 text-white text-2xl font-bold p-4 pr-20 pl-20 rounded-md bg-slate-700 hover:bg-slate-800" onClick={() => handleClick('START_STOP')}>{state.start_stop ? 'stop 🛑' : 'start 🔛'}</button>
                </div>
            
                <div id="reset">
                    <button className="shadow-xl mt-4 text-white text-2xl font-bold p-4 pr-20 pl-20 rounded-md bg-slate-700 hover:bg-slate-800" onClick={() => handleClick('RESET')}>reset ⬅️</button>
                </div>
            </div>

        </div>
    )

}



