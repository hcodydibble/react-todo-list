import React, { Component } from 'react';
import DayScheduleContainer from './DayScheduleContainer';
import 'react-calendar-timeline/lib/Timeline.css'
import './App.css';

class TodoApp extends Component {
  render() {
    return (
      <div className="App">
        <DayScheduleContainer />
      </div>
    );
  }
}
export default TodoApp;
