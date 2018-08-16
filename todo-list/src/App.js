import React, { Component } from 'react';
import DayScheduleContainer from './DayScheduleContainer';
import 'react-calendar-timeline/lib/Timeline.css'
import './App.css';

class TodoApp extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Here</h1>
        </header>
        <p className="App-intro">
          E X I S T E N C E I S P A I N
        </p>
        <DayScheduleContainer />
      </div>
    );
  }
}
export default TodoApp;
