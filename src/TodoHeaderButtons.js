import React from 'react';
import PropTypes from 'prop-types';

function TodoHeaderButtons(props) {
      return (
            <div className="global-buttons">
            <div className="btn-group btn-group--block" role="group" aria-label="Basic example">
              <div className="btn-group" role="group">
                <button
                  type="button"
                  onClick={(e) => props.handleHeaderButtons('change-complete-status')}
                  className="btn btn--success">
                  Mark all as complete
                </button>
              </div>
              <div className="btn-group" role="group">
                <button
                  onClick={(e) => props.handleHeaderButtons('delete-completed')}
                  className={(props.someTaskCompleted) ? "btn btn--warning" : "btn btn--info"}
                  disabled={(props.someTaskCompleted) ? false : true}>
                  Delete all completed
                  </button>
              </div>
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className="btn btn--danger"
                  onClick={(e) => props.handleHeaderButtons('delete-all')}>
                  Delete all tasks
                </button>
              </div>
            </div>
          </div>
      );
}

TodoHeaderButtons.propTypes = {
      someTaskCompleted: PropTypes.bool.isRequired,
      handleHeaderButtons: PropTypes.func.isRequired
};

export default TodoHeaderButtons;