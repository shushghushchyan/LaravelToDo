import React, { useState } from 'react';
import Calendar from 'react-calendar';

const MyCalendar = () => {
  const [value, setValue] = useState(new Date());

  return (
    <div className='calendar-container'>
      <Calendar onChange={setValue} value={value} />
    </div>
  );
};

export default MyCalendar;
