import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addCard, editCard, displayAddEditCard } from '../../actions/cardsActions';


class AddEditCardForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      card: {
        title: ``,
        priority: `low`,
        created_by: ``,
        assigned_to: ``
      },
      displayPriorityDropdown: false,
      titleError: ``,
      created_byError: ``,
      assigned_toError: ``
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleDisplayPriorityDropdown = this.handleDisplayPriorityDropdown.bind(this);
    this.handleHidePriorityDropdown = this.handleHidePriorityDropdown.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleHideAddEditCard = this.handleHideAddEditCard.bind(this);
  }

  componentWillMount() {
    if (this.props.addOrEdit === `edit`) {
      this.setState({ card: { ...this.props.cardToEdit } });
    }
  }

  componentDidMount() {
    this.focusTextInput();
  }

  focusTextInput() {
    this.textInput.focus();
    this.textInput.setSelectionRange(this.textInput.value.length, this.textInput.value.length);
  }

  handleChange(event) {
    if (event.target.className === `priority_option`) {
      this.setState({ card: { ...this.state.card, priority: event.target.dataset.value } });
      this.submitInput.focus();
    } else {
      this.setState({ card: { ...this.state.card, [event.target.name]: event.target.value } });
      this.setState({ [`${event.target.name}Error`]: `` });
    }
  }

  handleDisplayPriorityDropdown() {
    this.setState({ displayPriorityDropdown: true });
  }

  handleHidePriorityDropdown(event) {
    if (this.state.displayPriorityDropdown) {
      this.setState({ displayPriorityDropdown: false });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    let error = false;

    if (this.state.card.title === ``) {
      this.setState({ titleError: `Field is required!` });
      error = true;
    }
    if (this.state.card.created_by === ``) {
      this.setState({ created_byError: `Field is required!` });
      error = true;
    }
    if (this.state.card.assigned_to === ``) {
      this.setState({ assigned_toError: `Field is required!` });
      error = true;
    }
    if (error) {
      return;
    }

    if (this.props.addOrEdit === `add`) {
      let { title, priority, created_by, assigned_to } = this.state.card;
      this.props.addCard({ title, priority, created_by, assigned_to });
    } else {
      this.props.editCard(this.state.card);
    }

    this.handleHideAddEditCard();
  }

  handleHideAddEditCard(event) {
    if (!event || event.keyCode === 27 || event.target.className === 'hide_popup_button' || event.target.className === 'popup_background') {
      this.props.displayAddEditCard(false);
    }
  }

  render() {
    return (
      <div className='popup_background' onClick={this.handleHideAddEditCard} onKeyDown={this.handleHideAddEditCard}>
        <form id='add_edit_card_form' onSubmit={this.handleSubmit} onClick={this.handleHidePriorityDropdown}>
          <span className='hide_popup_button' onClick={this.handleHideAddEditCard}>X</span>
          <h2 className={`${this.props.addOrEdit}_card_form_title`}>{this.props.addOrEdit === `add` ?
            `CREATE CARD` : `EDIT CARD`}
          </h2>
          <div className='add_edit_label_container'>
            <p>Title:</p>
            <p className='add_edit_label_error'>{this.state.titleError}</p>
          </div>
          <input
            type='text'
            onChange={this.handleChange}
            name='title'
            value={this.state.card.title}
            placeholder='What needs to be done'
            ref={input => this.textInput = input}
          />
          <div className='add_edit_label_container'>
            <p>Assigned by:</p>
            <p className='add_edit_label_error'>{this.state.created_byError}</p>
          </div>
          <input
            type='text'
            onChange={this.handleChange}
            name='created_by'
            value={this.state.card.created_by}
            placeholder='Who is creating this'
            className='capitalize'
          />
          <div className='add_edit_label_container'>
            <p>Assigned to:</p>
            <p className='add_edit_label_error'>{this.state.assigned_toError}</p>
          </div>
          <input
            type='text'
            onChange={this.handleChange}
            name='assigned_to'
            value={this.state.card.assigned_to}
            placeholder='Who is handling this'
            className='capitalize'
          />
          <p>Priority:</p>
          <div className='priority_select_container'>
            <div
              onClick={this.handleDisplayPriorityDropdown}
              className='styled_select'>
              <p>{this.state.card.priority}</p>
              <p id={this.state.displayPriorityDropdown ? 'rotate_arrow' : null} className='select_arrow'>{'\u25BE'}</p>
            </div>
            {this.state.displayPriorityDropdown ?
              <ul>
                <li
                  id={this.state.card.priority === `low` ? `active_priority` : ``}
                  className='priority_option'
                  data-value='low'
                  onClick={this.handleChange}>
                  Low
                </li>
                <li
                  id={this.state.card.priority === `medium` ? `active_priority` : ``}
                  className='priority_option'
                  data-value='medium'
                  onClick={this.handleChange}>
                  Medium
                </li>
                <li
                  id={this.state.card.priority === `high` ? `active_priority` : ``}
                  className='priority_option'
                  data-value='high'
                  onClick={this.handleChange}>
                  High
                </li>
                <li
                  id={this.state.card.priority === `blocker` ? `active_priority` : ``}
                  className='priority_option'
                  data-value='blocker'
                  onClick={this.handleChange}>
                  Blocker
                </li>
              </ul> : null}
          </div>
          <br />
          <input type='submit'
            ref={input => this.submitInput = input}
            value={this.props.addOrEdit === `add` ?
              `Submit Card` : `Update Card`}
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cardToEdit: state.cards.cardToEdit,
    addOrEdit: state.cards.displayAddEditCard
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCard: card => {
      dispatch(addCard(card));
    },
    editCard: card => {
      dispatch(editCard(card));
    },
    displayAddEditCard: flag => {
      dispatch(displayAddEditCard(flag));
    }
  }
}

const ConnectedAddEditCardForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEditCardForm);

export default ConnectedAddEditCardForm;