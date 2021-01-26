import { React, useState, useEffect } from 'react';
// import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import './Task.css';

import Timer from '../Timer/Timer';

const Task = ({ minutes, seconds, completeChanged, id, taskDestroyed, completed,
taskText, taskCreateTime, className, setNewTime}) => {
  // state = {
  //   intervalId: 0,
  //   timerIsActive: false,
  // };

  const [ intervalId, setIntervalId ] = useState(0);
  const [ timerIsActive, setTimerIsActive ] = useState(false);
  // const [ timerMinutes, setTimerMinutes ] = useState(minutes);
  // const [ timerSeconds, setTimerSeconds ] = useState(seconds)



  // componentDidMount() {
  //   const { minutes } = this.props;
  //   const { seconds } = this.props;

  //   this.setState({
  //     timerMinutes: minutes,
  //     timerSeconds: seconds,
  //   });
  // }

  // componentWillUnmount() {
  //   this.stopTimer();
  // }

  const stopTimer = () => {
    console.log('Таймер не активен')
    clearTimeout(intervalId);

    setTimerIsActive(false);
  };


  const startTimer = () => {

    if (!timerIsActive) {
     const intId = setTimeout( () => {

      setIntervalId(intId)

          console.log('интервалит')
        
          if (minutes) {
            setNewTime(id, minutes, seconds - 1);

            if (seconds === -1) {
              setNewTime(id, minutes - 1, 59);
              // eslint-disable-next-line react/no-access-state-in-setstate
            }
          } else if (!minutes && seconds !== 0) {
            console.log('тут')
            setNewTime(id, minutes, seconds - 1 );
          }
          stopTimer()
          // console.log('tick')
        }, 1000);
      setTimerIsActive((state) => !state)
    }
  };


  const completeToogler = () => {
    completeChanged(id);
  };

  const currentTaskDestroyed = () => {

    taskDestroyed(id);
  };

  useEffect(() => {
    startTimer()

    return () => stopTimer()
  }, [minutes, seconds])

    // const { completed } = this.props;
    // const { taskText } = this.props;
    // const { minutes } = this.props;
    // const { seconds } = this.props;
    // const { taskCreateTime } = this.props;
    // const { className } = this.props;

    // const { timerMinutes } = this.state;
    // const { timerSeconds } = this.state;

    // console.log(completed);
    // console.log(this.props);
    return (
      <li className={completed ? 'completed' : ''}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={completeToogler} defaultChecked={completed} />
          <label>
            <span className="title">{taskText}</span>
            {minutes || seconds ? (
              <Timer
                minutes={minutes}
                seconds={seconds}
                startTimer={startTimer}
                stopTimer={stopTimer}
              />
            ) : null}
            <span className="created">created {formatDistanceToNow(taskCreateTime, { includeSeconds: true })} ago</span>
          </label>
          <button className="icon icon-edit" type="button" aria-label="Редактировать" />
          <button
            className="icon icon-destroy"
            onClick={currentTaskDestroyed}
            type="button"
            aria-label="Удалить"
          />
        </div>
        {className === 'editing' ? <input type="text" className="edit" defaultValue="Editing task" /> : null}
      </li>
    );
}

Task.defaultProps = {
  completed: false,
  taskText: '',
  minutes: '',
  seconds: '',
  taskCreateTime: new Date(),
  id: Math.random(),
  completeChanged: () => {},
  taskDestroyed: () => {},
  className: '',
};

Task.propTypes = {
  completed: PropTypes.bool,
  taskText: PropTypes.string,
  minutes: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  seconds: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  taskCreateTime: PropTypes.objectOf(PropTypes.object),
  id: PropTypes.number,
  completeChanged: PropTypes.func,
  taskDestroyed: PropTypes.func,
  className: PropTypes.string,
  setNewTime: PropTypes.func.isRequired,
};

export default Task;
