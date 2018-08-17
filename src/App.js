import React, { Component } from 'react';
import DayScheduleContainer from './DayScheduleContainer';
import 'react-calendar-timeline/lib/Timeline.css'
import './App.css';

class TodoApp extends Component {
  render() {
    return (
      <div className="App">
        <DayScheduleContainer />

        <h3>Navigation: </h3>
        <p>SHIFT+SCROLL WHEEL: Scroll forwards or backwards through the hours in the day.</p>
        <p>ALT+SCROLL WHEEL: Zoom in or out at a manageable speed.</p>
        <p>CTRL+SCROLL WHEEL: Zoom in or out at a crazy speed.</p>
        <p>Change the start and end time by clicking on the event you wish to change and then dragging to the desired time. Extend the time by dragging from either edge.</p>
      </div>
    );
  }
}
export default TodoApp;
