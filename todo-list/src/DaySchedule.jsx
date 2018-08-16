import React, { Component } from 'react';
import Timeline from 'react-calendar-timeline'
import moment from 'moment';
import 'react-calendar-timeline/lib/Timeline.css'

export default class DaySchedule extends Component{
    constructor(props){
        super(props)

        const todaysDate = moment(this.props.date).format("ddd, MMMM DD")
        const eventData = []
        const todaysEvents = []

        this.state = {
            todaysDate: todaysDate,
            eventData: eventData,
            todaysEvents: todaysEvents
        }
    }

    handleEventMove = (eventID, dragTime, newEventOrder) => {
        const {eventData, todaysEvents} = this.state;
        const eventGroup = todaysEvents[newEventOrder]
        this.setState({
            eventData: eventData.map(event => 
                event.id === eventID ? Object.assign({}, event, {
                    start_time: dragTime,
                    end_time: dragTime + (event.end_time - event.start_time),
                    eventGroup: eventGroup.id
                })
                 : event
            )
        })
        console.log("Moved: " + eventID, dragTime, newEventOrder)
    }

    render(){
        const {todaysDate, eventData, todaysEvents} = this.state;
        this.props.events.forEach((event, idx) => {
            if(moment.utc(event.startTime).format("ddd, MMMM DD") === todaysDate){
                eventData.push({
                    id: event.id,
                    group: event.id,
                    start_time: moment(event.startTime).valueOf(),
                    end_time: moment(event.endTime).valueOf(),
                    canMove: true,
                    canResize: 'both',
                })

                todaysEvents.push({
                    id: event.id,
                    title: event.description
                })
            }
        })

        return(
            <div>
              <Timeline
                groups={todaysEvents}
                items={eventData}
                defaultTimeStart={moment(this.props.date)}
                defaultTimeEnd={moment(this.props.date).add(12, 'hour')}
                onItemMove={this.handleEventMove}
              />
            </div>
          )
    }
}