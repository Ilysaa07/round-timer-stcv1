import React, { useState, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { RiResetLeftFill } from "react-icons/ri";
import Swal from 'sweetalert2'; // Ensure SweetAlert2 is installed
import Header from "./Header";

export default function Body() {
  const [rounds, setRounds] = useState(3);
  const [roundDuration, setRoundDuration] = useState({ minutes: 2, seconds: 0 });
  const [restDuration, setRestDuration] = useState({ minutes: 1, seconds: 0 });
  const [isActive, setIsActive] = useState(false);
  const [isRest, setIsRest] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(roundDuration.minutes * 60 + roundDuration.seconds);
  const [isFinished, setIsFinished] = useState(false);

  const totalDuration = isRest
    ? restDuration.minutes * 60 + restDuration.seconds
    : roundDuration.minutes * 60 + roundDuration.seconds;

  const percentage = totalDuration > 0
    ? ((totalDuration - timeLeft) / totalDuration) * 100
    : 0;

  useEffect(() => {
    let timer;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (currentRound < rounds) {
        const audio = new Audio("/audio/bell.mp3");
        audio.play();

        if (isRest) {
          setCurrentRound((prev) => prev + 1);
          setIsRest(false);
          setTimeLeft(roundDuration.minutes * 60 + roundDuration.seconds);
        } else {
          setIsRest(true);
          setTimeLeft(restDuration.minutes * 60 + restDuration.seconds);
        }
      } else {
        setIsFinished(true);
        setIsActive(false);
        const audio = new Audio("/audio/bell.mp3");
        audio.play();
      }
    }
    return () => clearInterval(timer);
  }, [
    isActive,
    timeLeft,
    isRest,
    currentRound,
    rounds,
    roundDuration,
    restDuration,
  ]);

  const toggleTimer = () => {
    const initialDuration = roundDuration.minutes * 60 + roundDuration.seconds;
    if (initialDuration <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Durasi Tidak Valid",
        text: "Durasi ronde harus lebih dari 0 detik.",
      });
      return;
    }

    if (isActive) {
      setIsActive(false);
    } else {
      setIsFinished(false);
      setTimeLeft(initialDuration);
      setIsActive(true);
      const audio = new Audio("/audio/bell.mp3");
      audio.play();
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(roundDuration.minutes * 60 + roundDuration.seconds);
    setCurrentRound(1);
    setIsRest(false);
    setIsFinished(false);
  };

  const displayTime = `${Math.floor(timeLeft / 60)}:${("0" + (timeLeft % 60)).slice(-2)}`;

  const generateOptions = (max) =>
    Array.from({ length: max + 1 }, (_, i) => (
      <option key={i} value={i}>
        {i.toString().padStart(2, "0")}
      </option>
    ));

  return (
    <div className="stopwatch-container">
      <Header />
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
              transition: "stroke-dashoffset 1s linear",
            }}
          />
        </svg>
        <div className="time-display">
          <h1>
            {isFinished
              ? "Selesai"
              : isRest
              ? "Istirahat"
              : `Ronde ${currentRound}`}
          </h1>
          <h2>{displayTime}</h2>
        </div>
      </div>
      <div className="buttons">
        <div onClick={toggleTimer} className="icon-toggle">
          {isActive ? <FaPause className="icon" /> : <FaPlay className="icon" />}
        </div>
        <RiResetLeftFill onClick={resetTimer} className="btn-reset" />
      </div>

      <div className="inputs">
        <label>
          Ronde:
          <input
            type="number"
            value={rounds}
            onChange={(e) => setRounds(Number(e.target.value))}
            min="1"
          />
        </label>

        <label>
          Durasi Ronde:
          <div className="time-picker">
            <select
              value={roundDuration.minutes}
              onChange={(e) =>
                setRoundDuration((prev) => ({
                  ...prev,
                  minutes: Number(e.target.value),
                }))
              }
            >
              {generateOptions(59)}
            </select>
            :
            <select
              value={roundDuration.seconds}
              onChange={(e) =>
                setRoundDuration((prev) => ({
                  ...prev,
                  seconds: Number(e.target.value),
                }))
              }
            >
              {generateOptions(59)}
            </select>
          </div>
        </label>

        <label>
          Durasi Istirahat:
          <div className="time-picker">
            <select
              value={restDuration.minutes}
              onChange={(e) =>
                setRestDuration((prev) => ({
                  ...prev,
                  minutes: Number(e.target.value),
                }))
              }
            >
              {generateOptions(59)}
            </select>
            :
            <select
              value={restDuration.seconds}
              onChange={(e) =>
                setRestDuration((prev) => ({
                  ...prev,
                  seconds: Number(e.target.value),
                }))
              }
            >
              {generateOptions(59)}
            </select>
          </div>
        </label>
      </div>

      <br />
      <div>&copy; 2025 Ilyasa Meydiansyah</div>
    </div>
  );
}
