import React from 'react';
import EventCalendar from '../components/EventCalendar';

const EventsPage = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      fontFamily: 'Inter, sans-serif',
      padding: '2rem 0'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <EventCalendar />
      </div>
    </div>
  );
};

export default EventsPage;

