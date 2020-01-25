import React from 'react';

export default ({ handleDisplayAddEditCard }) => {
  return (
    <div className='header_container'>
      <p>KANBAN</p>
      <span onClick={handleDisplayAddEditCard}>+ NEW TASK</span>
    </div>
  )
}