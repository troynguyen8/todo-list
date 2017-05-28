import React from 'react';
import PropTypes from 'prop-types';
import TodoFilters from './TodoFilters.js';

function TodoFooter(props) {
      return (
        <div className="footer">
          <TodoFilters
            currentFilter={props.currentFilter}
            changeFilter={props.changeFilter}
            showActive={props.showActive}
          />
          <div className="footer-line2">
            <p
              className="incomplete-counter text-muted text-md-center">
              Tasks still to do: <span className="incomplete-count text-info">{props.incompleteCount}</span>
            </p>
            <ul className="nav nav--pills edit-button">
              <li className="nav__item">
                <a
                  className={(props.editMode) ? "nav__link active edit-on" : "nav__link edit-off"}
                  onClick={props.handleEditModePress}>
                  edit todos
                </a>
              </li>
            </ul>
          </div>
        </div>
      );
}

TodoFooter.propTypes = {
      currentFilter: PropTypes.number.isRequired,
      changeFilter: PropTypes.func.isRequired,
      incompleteCount: PropTypes.number.isRequired,
      handleEditModePress: PropTypes.func.isRequired,
      editMode: PropTypes.bool.isRequired
}

export default TodoFooter;