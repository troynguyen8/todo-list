import React from 'react';
import PropTypes from 'prop-types';

function TodoInput(props) {
      return (
            <div className="input-box">
                  <input
                        className="form-control form-control--lg input-box"
                        placeholder="what do you have to do?" 
                        onChange={(e) => props.handleInput.handleTyping(e)}
                        value={props.updatedTodo}
                        onKeyDown={(e) => props.handleInput.handleEnter(e)}
                        autoFocus={true}
                  />
            </div>
      );
}

TodoInput.propTypes = {
      handleInput: PropTypes.object.isRequired,
      updatedTodo: PropTypes.string.isRequired
}

export default TodoInput;