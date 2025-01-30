import { useState } from 'react';
import Header from './components/Header';
import TabView from './components/TabView';
import EventsList from './components/events/EventList';
import CommunitiesView from './components/communities/CommunitiesView';
import useLocalStorage from './hooks/useLocalStorage';
import CreateEventForm from './components/events/CreateEventForm';

const App = () => {
  const [activeTab, setActiveTab] = useState('Events');
  const [events, setEvents] = useLocalStorage('events', []);
  const [communities, setCommunities] = useLocalStorage('communities', [
    'Indiranagar Run Club',
    'Delhi Royal Enfield Riders',
    'Bhag Club',
    'Tech Meetup Group'
  ]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div className="w-screen min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto bg-white min-h-screen">
        <Header setShowCreateForm={setShowCreateForm} />
        <TabView activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="lg:flex-1">
          {!showCreateForm ? (
            activeTab === 'Events' ? (
              <EventsList events={events} />
            ) : (
              <CommunitiesView events={events} communities={communities} />
            )
          ) : (
            <CreateEventForm 
              setShowCreateForm={setShowCreateForm}
              events={events}
              setEvents={setEvents}
              communities={communities}
              setCommunities={setCommunities}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;