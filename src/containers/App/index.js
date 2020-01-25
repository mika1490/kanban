import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles.css';

import Header from '../../components/Header';
import CardList from '../../components/CardList';
import AddEditCardForm from '../AddEditCardForm';
import { loadCards, deleteCard, moveCard, setCardToEdit, displayAddEditCard } from '../../actions/cardsActions';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleDisplayAddEditCard = this.handleDisplayAddEditCard.bind(this);
  }
  
  componentWillMount() {
    this.props.loadCards();
  }

  handleDisplayAddEditCard() {
    this.props.displayAddEditCard(`add`);
  }
  
  render() {
    return (
      <div className='kanban_board'>
        <Header handleDisplayAddEditCard={this.handleDisplayAddEditCard}/>
        <div className='lists_container'>
          <CardList 
            cards={this.props.cards} 
            status='queue' 
            deleteCard={this.props.deleteCard}
            moveCard={this.props.moveCard}
            setCardToEdit={this.props.setCardToEdit}
          />
          <CardList 
            cards={this.props.cards} 
            status='progress'
            deleteCard={this.props.deleteCard} 
            moveCard={this.props.moveCard} 
            setCardToEdit={this.props.setCardToEdit}
          />
          <CardList 
            cards={this.props.cards} 
            status='done'
            deleteCard={this.props.deleteCard}
            moveCard={this.props.moveCard}
            setCardToEdit={this.props.setCardToEdit}
          />
        </div>
        
        {this.props.displayAddEditCardFlag ?
         <AddEditCardForm /> : null} 
      </div> 
    )
  }
}

const mapStateToProps = state => {
  return {
    cards: state.cards.cards,
    displayAddEditCardFlag: state.cards.displayAddEditCard
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCards: () => {
      dispatch(loadCards());
    },
    deleteCard: id => {
      dispatch(deleteCard(id));
    },
    moveCard: (id, status) => {
      dispatch(moveCard(id, status));
    },
    setCardToEdit: id => {
      dispatch(setCardToEdit(id));
    },
    displayAddEditCard: flag => {
      dispatch(displayAddEditCard(flag));
    }
  }
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default ConnectedApp;