import React from 'react';
import PropTypes from 'prop-types';

function TodoItem(props) {
  return (
    <div className="item">

        <div className="complete-button-container">
          <button
            type="button"
            onClick={(e) => props.handleItemButtonPresses(props.id, 'complete')}
            className={(props.completed) ? 'btn--success complete-button' : "btn btn--secondary complete-button"}>
            {(props.completed) ? 'complete' : 'incomplete'}
          </button>
        </div>

        <div className="item-text-container">
          <h4
            className={(props.completed) ? "task-text complete" : "task-text incomplete"}>
            {(props.completed) ? <s>{props.task}</s> : props.task}
          </h4>
        </div>

        <div className="right-item-buttons">
          <button
            type="button"
            className="close close--lg pull-sm-right delete-button"
            onClick={(e) => props.handleItemButtonPresses(props.id, 'delete')}>
          </button>

          {
            (props.editMode)

            ?

            <div className="form-checkbox edit-container">
              <input
                className="edit-checkbox"
                type="checkbox"
                onChange={(e) => props.handleItemButtonPresses(props.id, 'check')}
                checked={(props.isChecked) ? true : false}
              />
            </div>

            :

            ''
          }
        </div>
        
    </div>
  );
}

TodoItem.propTypes = {
  task: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  editMode: PropTypes.bool.isRequired,
  isChecked: PropTypes.bool.isRequired,
  handleItemButtonPresses: PropTypes.func.isRequired
};

export default TodoItem;