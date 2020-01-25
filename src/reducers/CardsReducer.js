import { LOAD_CARDS, SET_CARD_TO_EDIT, DISPLAY_ADD_EDIT_CARD_FLAG } from '../actions/cardsActions';

const initialState = {
  cards: [],
  cardToEdit: {},
  displayAddEditCard: false
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_CARDS:
      return { ...state, cards: action.cards };
    case SET_CARD_TO_EDIT:
      return { ...state, setCardToEdit: action.card };
    case DISPLAY_ADD_EDIT_CARD_FLAG:
      return { ...state, displayAddEditCard: action.flag };
    default:
      return state;
  }
}