import React from 'react';

export default ({ id, title, priority, status, created_by, assigned_to, deleteCard, setCardToEdit }) => {
 
  function handleDelete(event) {
   deleteCard(id);
 }
  function handleEdit(event) {
    setCardToEdit(id);
  }
  function dragStart(event) {
    event.dataTransfer.setData(`id`, id);
    event.dataTransfer.setData(`status`, status);
  }

  return (
    <div className={`card_list_item ${status}_card`} draggable='true' onDragStart={dragStart}>
      <p className='card_item_title'>{title}</p>
      <div className='priority_container'>
        <p>Priority:</p>
        <p className='capitalize'>{priority}</p>
      </div>
      <div className='assigned_by_container'>
        <p>Assigned by:</p>
        <p className='capitalize'>{created_by}</p>
      </div>
      <div className='card_item_bottom_row'>
        <div className='edit_delete_container'>
          <p onClick={handleEdit}>Edit</p>
          <p onClick={handleDelete}>Delete</p>
        </div>
        <div className='assigned_to_container'>
          <p>{assigned_to}</p>
        </div>
      </div>
    </div>
  )
}