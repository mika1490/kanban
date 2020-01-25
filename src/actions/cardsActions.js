import 'whatwg-fetch';

const HOST = '/api/cards';

export const LOAD_CARDS = `LOAD_CARDS`;
export const ADD_CARD = `ADD_CARD`;
export const DELETE_CARD = `DELETE_CARD`;
export const EDIT_CARD = `EDIT_CARD`;
export const SET_CARD_TO_EDIT = `SET_CARD_TO_EDIT`;
export const DISPLAY_ADD_EDIT_CARD_FLAG = `DISPLAY_ADD_EDIT_CARD_FLAG`;
export const MOVE_CARD = `MOVE_CARD`;

export const loadCards = () => {
  return dispatch => {
    return fetch(`${HOST}`)
    .then(response => response.json())
    .then(cards => {
      return cards.sort(compareCard);
    })
    .then(sortedCards => {
      dispatch({
        type: LOAD_CARDS,
        cards: sortedCards
      });
    })
    .catch(err => console.log(err));
  }
}

export const addCard = card => {
  console.log('carrr', card)
  return dispatch => {
    return fetch(`${HOST}`, {
      method: `POST`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(card)
    })
    .then(success => {
      dispatch(loadCards());
    });
  }
}

export const deleteCard = id => {
  return dispatch => {
    return fetch(`${HOST}/${id}`, {
      method: `DELETE`
    })
    .then(success => {
      dispatch(loadCards());
    });
  }
}

export const setCardToEdit = id => {
  return dispatch => {
    return fetch(`${HOST}/${id}`)
    .then(response => response.json())
    .then(card => {
      return dispatch({
        type: SET_CARD_TO_EDIT,
        card: card
      });
    })
    .then(displayCard => {
      dispatch(displayAddEditCard(`edit`));
    });
  }
}

export const editCard = card => {
  return dispatch => {
    return fetch(`${HOST}/${card.id}`, {
      method: `PUT`,
      headers: {
        'Content-Type': `application/json`
      },
      body: JSON.stringify(card)
    })
    .then(success => {
      dispatch(loadCards());
    });
  }
}

export const moveCard = (id, status) => {
  return dispatch => {
    return fetch(`${HOST}/${id}`, {
      method: `PUT`,
      headers: {
        'Content-Type': `application/json`
      },
      body: JSON.stringify({ status })
    })
    .then(success => {
      dispatch(loadCards());
    });
  }
}

export const displayAddEditCard = flag => {
  return {
    type: DISPLAY_ADD_EDIT_CARD_FLAG,
    flag: flag
  }
}

function compareCard(a, b) {
  let priorityIndex = [`low`, `medium`, `high`, `blocker`];

  let aIndex = priorityIndex.indexOf(a.priority);
  let bIndex = priorityIndex.indexOf(b.priority);

  if (aIndex < bIndex) {
    return 1;
  }
  if (aIndex > bIndex) {
    return -1;
  }
  return a.id > b.id;
}



// import axios from 'axios';
// const HOST = '/api/cards';

// export const LOAD_CARDS = `LOAD_CARDS`;
// export const ADD_CARD = `ADD_CARD`;
// export const DELETE_CARD = `DELETE_CARD`;
// export const EDIT_CARD = `EDIT_CARD`;
// export const SET_CARD_TO_EDIT = `SET_CARD_TO_EDIT`;
// export const DISPLAY_ADD_EDIT_CARD_FLAG = `DISPLAY_ADD_EDIT_CARD_FLAG`;
// export const MOVE_CARD = `MOVE_CARD`;

// export const loadCards = () => {
//   return dispatch => {
//     return axios.get(HOST)
//     .then(cards => {
//       dispatch({
//         type: LOAD_CARDS,
//         cards: cards.data
//       });
//     })
//     .catch(err => {
//       console.log(err)
//     })
//   }
// }

// export const addCard = card => {
//   return dispatch => {
//     return axios.post(HOST, card)
//     .then(newCardDetails => {
//       if(newCardDetails.data && newCardDetails.data.id) {
//         dispatch(loadCards())
//       }
//     })
//     .catch(err => {
//       console.log(err)
//     })
//   }
// }

// export const deleteCard = id => {
//   return dispatch => {
//     return axios.delete(`${HOST}/${id}`) 
//     .then(result => {
//       return dispatch(
//         loadCards()
//       )
//     })
//     .catch(err => {
//       console.log(err)
//     })
//   }
// }

// export const setCardToEdit = id => {
//   return dispatch => ({
//     type: SET_CARD_TO_EDIT,
//     card: id
//   })
//   .catch(err => {
//     console.log(err)
//   })
// }

// export const editCard = id => {
//   return dispatch => {
//     return axios.put(`${HOST}/${id}`)
//     .then(result => {
//       return dispatch(
//         loadCards()
//       )
//     })
//     .catch(err => {
//       console.log(err)
//     })
//   }
// }

// export const moveCard = (id, status) => {
//   return dispatch => {
//     return axios.put(`${HOST}/${id}`)
//     .then(result => {
//       return dispatch(
//         loadCards()
//       )
//     })
//     .catch(err => {
//       console.log(err)
//     })
//   }
// }

// export const displayAddEditCard = flag => {
//   return {
//     type: DISPLAY_ADD_EDIT_CARD_FLAG,
//     flag: flag
//   }
// }

// function compareCard(a, b) {
//   let priorityIndex = [`low`, `medium`, `high`, `blocker`];

//   let aIndex = priorityIndex.indexOf(a.priority);
//   let bIndex = priorityIndex.indexOf(b.priority);

//   if (aIndex < bIndex) {
//     return 1;
//   }
//   if (aIndex > bIndex) {
//     return -1;
//   }
//   return a.id > b.id;
// }