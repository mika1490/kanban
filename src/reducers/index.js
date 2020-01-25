import { combineReducers } from 'redux';
import cardsReducer from './CardsReducer';

export default combineReducers({
  cards: cardsReducer
});