import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { RiResetLeftFill } from "react-icons/ri";



export default function Body() {
  const [rounds, setRounds] = useState(3);
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  const [restMinutes, setRestMinutes] = useState(1);
  const [restSeconds, setRestSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isRest, setIsRest] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(minutes * 60 + seconds);
  const [isFinished, setIsFinished] = useState(false);

  const totalDuration = isRest ? restMinutes * 60 + restSeconds : minutes * 60 + seconds;
  const percentage = ((totalDuration - timeLeft) / totalDuration) * 100;

  useEffect(() => {
    let timer;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (currentRound < rounds) {
        const audio = new Audio('/src/assets/bell.mp3');
        audio.play();

        if (isRest) {
          setCurrentRound((prev) => prev + 1);
          setIsRest(false);
          setTimeLeft(minutes * 60 + seconds);
        } else {
          setIsRest(true);
          setTimeLeft(restMinutes * 60 + restSeconds);
        }
      } else {
        setIsFinished(true);
        setIsActive(false);
        const audio = new Audio('/src/assets/bell.mp3');
        audio.play();
      }
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, isRest, currentRound, rounds, minutes, seconds, restMinutes, restSeconds]);

  const toggleTimer = () => {
    if (isActive) {
      setIsActive(false);
    } else {
      setIsFinished(false);
      setTimeLeft(minutes * 60 + seconds);
      setIsActive(true);
      const audio = new Audio('/src/assets/bell.mp3');
      audio.play();
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(minutes * 60 + seconds);
    setCurrentRound(1);
    setIsRest(false);
    setIsFinished(false);
  };

  const displayTime = `${Math.floor(timeLeft / 60)}:${('0' + (timeLeft % 60)).slice(-2)}`;

  return (
    <div className="stopwatch-container">
     <div className="headerlogo">
      <ul>
      <li><img src="/src/assets/logo.png" alt="" className='logo'/><img src="/src/assets/logo2.png" alt="" className='logo2'/></li>
      <li>Round Timer STCv1</li>
      </ul>
      </div>
      <div className="circle-wrapper">
        <svg className="progress-ring" width="200" height="200">
          <circle
            className="progress-ring__circle"
            stroke="red"
            strokeWidth="10"
            fill="transparent"
            r="90"
            cx="100"
            cy="100"
            style={{
              strokeDasharray: 2 * Math.PI * 90,
              strokeDashoffset: 2 * Math.PI * 90 * (1 - percentage / 100),
              transition: 'stroke-dashoffset 1s linear'
            }}
          />
        </svg>
        <div className="time-display">
          <h1>{isFinished ? 'Selesai' : isRest ? 'Istirahat' : `Ronde ${currentRound}`}</h1>
          <h2>{displayTime}</h2>
        </div>
      </div>
      <div className="buttons">
        <div onClick={toggleTimer} className="icon-toggle">
          {isActive ? <FaPause className='icon'/> : <FaPlay className='icon'/>}
        </div>
        <RiResetLeftFill onClick={resetTimer} className="btn-reset"/>
      </div>
      <div className="inputs">
        <label>
          Ronde:
          <input type="number" value={rounds} onChange={(e) => setRounds(Number(e.target.value))} min="1" />
        </label>
        <label>
          Durasi Ronde (menit:detik):
          <input type="text" value={`${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`} onChange={(e) => {
            const [m, s] = e.target.value.split(':');
            setMinutes(Number(m));
            setSeconds(Number(s));
          }} pattern="^([01]?[0-9]|2[0-3]):([0-5][0-9])$" />
        </label>
        <label>
          Durasi Istirahat (menit:detik):
          <input type="text" value={`${restMinutes < 10 ? '0' + restMinutes : restMinutes}:${restSeconds < 10 ? '0' + restSeconds : restSeconds}`} onChange={(e) => {
            const [m, s] = e.target.value.split(':');
            setRestMinutes(Number(m));
            setRestSeconds(Number(s));
          }} pattern="^([01]?[0-9]|2[0-3]):([0-5][0-9])$" />
        </label>
      </div>
      <br />
      <div>&copy; 2025 Ilyasa Meydiansyah</div>
    </div>
  );
}
