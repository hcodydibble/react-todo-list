import React, { Component } from 'react';
import Timeline from 'react-calendar-timeline';
import moment from 'moment';

export default class DaySchedule extends Component {
  state = {
    todaysDate: moment(this.props.date).format('ddd, MMMM DD'),
    eventData: [],
    todaysEvents: [],
  };

  componentWillMount() {
    const { todaysDate, eventData, todaysEvents } = this.state;
    this.props.events.forEach((event, idx) => {
      if (moment.utc(event.startTime).format('ddd, MMMM DD') === todaysDate) {
        eventData.push({
          id: event.id,
          group: event.id,
          start_time: moment(event.startTime).valueOf(),
          end_time: moment(event.endTime).valueOf(),
          canMove: true,
          canResize: 'both',
        });
        todaysEvents.push({
          id: event.id,
          title: event.description,
        });
      }
    });
  }

  handleEventMove = (eventID, dragTime, newEventOrder) => {
    const { eventData, todaysEvents } = this.state;
    const eventGroup = todaysEvents[newEventOrder];
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
    const { eventData, todaysEvents } = this.state;
    const { handleEventMove, handleEventResize } = this;
    return (
      <div>
        <Timeline
          groups={todaysEvents}
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
