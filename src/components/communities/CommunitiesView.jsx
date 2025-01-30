import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import EventCard from '../events/EventCard';

const CommunitiesView = ({ events, communities }) => {
  const [openCommunity, setOpenCommunity] = useState(null);

  const communityEvents = (community) => {
    return events.filter(event => event.community === community);
  };

  return (
    <div className="p-4 lg:p-6">
      <div className="space-y-4">
        {communities.map((community) => (
          <div key={community} className="border rounded-lg overflow-hidden">
            <button
              className="w-full p-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100"
              onClick={() => setOpenCommunity(openCommunity === community ? null : community)}
            >
              <span className="font-medium">{community}</span>
              <ChevronRight
                size={20}
                className={`transform transition-transform ${
                  openCommunity === community ? 'rotate-90' : ''
                }`}
              />
            </button>
            {openCommunity === community && (
              <div className="flex flex-wrap -mx-4">
                {communityEvents(community).map((event, index) => (
                  <EventCard key={index} event={event} />
                ))}
                {communityEvents(community).length === 0 && (
                  <div className="p-4 text-gray-500 text-center">
                    No events in this community yet
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunitiesView;