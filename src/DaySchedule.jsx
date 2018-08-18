import React, { Component } from 'react';
import Timeline from 'react-calendar-timeline';
import moment from 'moment';
 window.id = 0;
export default class DaySchedule extends Component {
  state = {
    todaysDate: moment(this.props.date).format('ddd, MMMM DD'),
    eventData: [],
    group: [{id: 1}]
  };

  componentWillMount() {
    const { todaysDate, eventData, todaysEvents } = this.state;
    this.props.events.forEach((event, idx) => {
      eventData.push({
          id: window.id++,
          group: 1,
          title: event.description,
          start_time: moment.utc(event.startTime).valueOf(),
          end_time: moment.utc(event.endTime).valueOf(),
          canMove: true,
          canResize: 'both',
        });
    });
  }

  handleEventMove = (eventID, dragTime, newEventOrder) => {
    const { eventData, group } = this.state;
    const eventGroup = group[newEventOrder];
    const eventState = eventData.map(event => {
      if (event.id === eventID) {
        return Object.assign({}, event, {
          start_time: dragTime,
          end_time: dragTime + (event.end_time - event.start_time),
          eventGroup: eventGroup.id,
        });
      }
      return event;
    });

    this.setState({
      eventData: eventState,
    });
    console.log(`Moved: ${eventID}`, dragTime, newEventOrder);
  };

  handleEventResize = (eventID, time, edge) => {
      const {eventData} = this.state;
      const eventState = eventData.map(event => {
          if(event.id === eventID){
              return Object.assign({}, event, {
                  start_time: edge === 'left' ? time : event.start_time,
                  end_time: edge === 'left' ? event.end_time : time
              })
          }
          return event;
      });
      
      this.setState({
          eventData: eventState,
      })
      console.log(`Resized ${eventID}`, time, edge)
  }

  render() {
    const { eventData, group } = this.state;
    const { handleEventMove, handleEventResize } = this;
    return (
      <div>
        <Timeline
          groups={group}
          items={eventData}
          defaultTimeStart={moment(this.props.date)}
          defaultTimeEnd={moment(this.props.date).add(12, 'hour')}
          onItemMove={handleEventMove}
          onItemResize={handleEventResize}
        />
      </div>
    );
  }
}
