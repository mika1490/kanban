import React from 'react';
import CardListItem from './CardListItem';

export default ({ cards, status, deleteCard, moveCard, setCardToEdit }) => {
  cards = cards.filter(card => card.status = status);
  let header;
  switch (status) {
    case `queue`:
    header = `IN QUEUE`;
    break;
    case `progress`:
    header = `IN PROGRESS`;
    break;
    default:
    header = `DONE`;
    break;
  }

  function allowDrag(event) {
    event.preventDefault();
  }

  function drop(event) {
    if(event.dataTransfer.getData(`status`) !== status) {
      let droppedCardId = event.dataTransfer.getData(`id`);
      moveCard(droppedCardId, status);
    }
  }
  return (
    <div className='card_list' onDragOver={allowDrag} onDrop={drop}>
      <h4>{header}</h4>
        {cards.length ? 
          cards.map(card => {
            return <CardListItem
              key={card.id}
              id={card.id}
              title={card.title}
              priority={card.priority}
              status={card.status}
              created_by={card.created_by}
              assigned_to={card.assigned_to}
              deleteCard={deleteCard}
              setCardToEdit={setCardToEdit}
            />
          }) : <h3>(No cards)</h3>}
    </div>
  );
}