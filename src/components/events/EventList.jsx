import React from 'react';
import EventCard from './EventCard.jsx';

const EventList = ({ events }) => {
    return (
      <div className="container mx-auto">
        <div className="flex flex-wrap -mx-4">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    );
  };
  
  export default EventList;