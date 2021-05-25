import React, { Component, useState, useEffect } from "react";
import Button from "../Button";
import Controls from "./Controls";
import TimerDisplay from "./TimerDisplay";
import style from './Timer.module.css';
console.log(style);


function Timer({ name = "Timer" }) {
  const [state, setState] = useState({
    isRunning: false,
    startTime: null,
    diff: null,
    currentTime: "00:00:00.000",
    startButton: {
      caption: "Start",
      isHidden: false,
      handler: start
    },
    pauseButton: {
      caption: "Pause",
      isHidden: true,
      handler: pause
    }
  });

  useEffect(() => {
    if (state.isRunning) {
      setTimeout(tick, 10);
    }
  }, [state]);

  function start() {
    const { isRunning, startTime } = state;
    if (isRunning || startTime) return;

    setState({
      ...state,
      isRunning: true,
      startTime: Date.now(),
      startButton: {
        caption: "Reset",
        isHidden: false,
        handler: reset
      },
      pauseButton: {
        caption: "Pause",
        isHidden: false,
        handler: pause
      }
    });
  }

  function pause() {
    setState((newState) => ({
      ...newState,
      isRunning: false,
      diff: Date.now() - newState.startTime,
      pauseButton: {
        caption: "Resume",
        isHidden: false,
        handler: resume
      }
    }));
  }

  function reset() {
    setState((newState) => ({
      ...newState,
      isRunning: false,
      currentTime: msToTime(0),
      startTime: null,
      diff: null,
      startButton: {
        caption: "Start",
        isHidden: false,
        handler: start
      },
      pauseButton: {
        caption: "Pause",
        isHidden: true,
        handler: pause
      }
    }));
  }

  function resume() {
    setState((newState) => ({
      ...newState,
      isRunning: true,
      startTime: Date.now() - newState.diff,
      pauseButton: {
        caption: "Pause",
        isHidden: false,
        handler: pause
      }
    }));
  }

  function tick() {
    setState((newState) => ({
      ...newState,
      currentTime: newState.isRunning
        ? msToTime(Date.now() - newState.startTime)
        : newState.currentTime
    }));
  }

  function msToTime(duration = 0) {
    const getCorrectTimeString = (v) => (v < 10 ? `0${v}` : v);

    const seconds = getCorrectTimeString(((duration / 1000) % 60).toFixed(3));
    const minutes = getCorrectTimeString(
      Math.trunc((duration / (1000 * 60)) % 60)
    );
    const hours = getCorrectTimeString(Math.trunc(duration / (1000 * 60 * 60)));

    return `${hours}:${minutes}:${seconds}`;
  }

  const { startButton, pauseButton, currentTime } = state;

  return (
    <article className={style.container}>
      <h2>{name}</h2>
      <TimerDisplay currentTime={currentTime} />
      <Controls>
        <Button handler={startButton.handler} caption={startButton.caption} />
        {!pauseButton.isHidden && (
          <Button
            handler={pauseButton.handler}
            caption={pauseButton.caption}
          />
        )}
      </Controls>
    </article>
  );
}



// class Timer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isRunning: false,
//       startTime: null,
//       diff: null,
//       currentTime: "00:00:00.000",
//       startButton: {
//         caption: "Start",
//         isHidden: false,
//         handler: this.start,
//       },
//       pauseButton: {
//         caption: "Pause",
//         isHidden: true,
//         handler: this.pause,
//       },
//     };
//   }

//   msToTime(duration = 0) {
//     const getCorrectTimeString = (v) => (v < 10 ? `0${v}` : v);

//     const seconds = getCorrectTimeString(((duration / 1000) % 60).toFixed(3));
//     const minutes = getCorrectTimeString(
//       Math.trunc((duration / (1000 * 60)) % 60)
//     );
//     const hours = getCorrectTimeString(Math.trunc(duration / (1000 * 60 * 60)));

//     return `${hours}:${minutes}:${seconds}`;
//   }
//   tick = () => {
//     const { isRunning, startTime } = this.state;
//     if (!isRunning) return;
//     setTimeout(this.tick, 10);
//     this.setState({
//       currentTime: this.msToTime(Date.now() - startTime),
//     });
//   };

//   start = () => {
//     const { isRunning, startTime } = this.state;
//     if (isRunning || startTime) return;
//     this.setState({
//       isRunning: true,
//       startTime: Date.now(),
//       startButton: {
//         caption: "Reset",
//         isHidden: false,
//         handler: this.reset,
//       },
//       pauseButton: {
//         caption: "Pause",
//         isHidden: false,
//         handler: this.pause,
//       },
//     });
//     setTimeout(this.tick, 10);
//   };

//   pause = () => {
//     const { startTime } = this.state;
//     this.setState({
//       isRunning: false,
//       diff: Date.now() - startTime,
//       pauseButton: {
//         caption: "Resume",
//         isHidden: false,
//         handler: this.resume,
//       },
//     });
//   };

//   reset = () => {
//     this.setState({
//       isRunning: false,
//       currentTime: this.msToTime(0),
//       startTime: null,
//       diff: null,
//       startButton: {
//         caption: "Start",
//         isHidden: false,
//         handler: this.start,
//       },
//       pauseButton: {
//         caption: "Pause",
//         isHidden: true,
//         handler: this.pause,
//       },
//     });
//   };

//   resume = () => {
//     const { diff } = this.state;
//     this.setState({
//       isRunning: true,
//       startTime: Date.now() - diff,
//       pauseButton: {
//         caption: "Pause",
//         isHidden: false,
//         handler: this.pause,
//       },
//     });
//     setTimeout(this.tick, 10);
//   };
//   render() {
//     const { name = "Timer" } = this.props;
//     const { currentTime, startButton, pauseButton } = this.state;
    // return (
    //   <article className={style.container}>
    //     <h2>{name}</h2>
    //     <TimerDisplay currentTime={currentTime} />
    //     <Controls>
    //       <Button handler={startButton.handler} caption={startButton.caption} />
    //       {!pauseButton.isHidden && (
    //         <Button
    //           handler={pauseButton.handler}
    //           caption={pauseButton.caption}
    //         />
    //       )}
    //     </Controls>
    //   </article>
    // );
//   }
// }

export default Timer;
