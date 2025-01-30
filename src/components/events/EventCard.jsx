import { useState } from 'react';
import { MapPin, Clock } from 'lucide-react';

const EventCard = ({ event }) => {
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });
    };
  
    const placeholderImage = 'https://via.placeholder.com/400x500';
  
    return (
      <div className="w-full md:w-1/2 p-4 hover:bg-gray-50 transition-colors">
        <div className="relative rounded-lg overflow-hidden mb-3">
          {event.mediaType === 'video' ? (
            <video
              src={event.media}
              className="w-full aspect-[4/5] object-cover"
              controls
            />
          ) : (
            <img 
              src={event.media || placeholderImage} 
              alt={event.title}
              className="w-full aspect-[4/5] object-cover"
            />
          )}
          <div className="absolute top-4 left-4 flex items-center bg-black bg-opacity-30 rounded-full px-3 py-1">
            <img 
              src="https://via.placeholder.com/40x40" 
              alt="Author"
              className="w-6 h-6 rounded-full"
            />
            <span className="text-white text-sm ml-2">By {event.community}</span>
          </div>
        </div>
        <h3 className="font-semibold mb-2">{event.title}</h3>
        <div className="flex items-center text-gray-500 text-sm mb-1">
          <Clock size={16} className="mr-2" />
          <span>{formatDate(event.startDate)}</span>
        </div>
        <div className="flex items-center text-gray-500 text-sm">
          <MapPin size={16} className="mr-2" />
          <span>{event.location}</span>
        </div>
      </div>
    );
  };
  export default EventCard;