import React from 'react';
import PropTypes from 'prop-types';

function TodoEditButtons(props) {
       return (
         <div className="edit-buttons">
           <div className="btn-group btn-group--block" role="group" aria-label="Basic example">
             <div className="btn-group" role="group">
               <button
                 type="button"
                 onClick={(e) => props.handleEditButtons('complete')}
                 className={(props.someTaskChecked) ? "btn btn--success edit-header-button" : "btn btn--info edit-header-button"}
                 disabled={(props.someTaskChecked) ? false : true}>
                 {(props.someTaskChecked) ? 'Mark checked as complete' : ''}
               </button>
             </div>
             <div className="btn-group" role="group">
               <button
                 onClick={(e) => props.handleEditButtons('active')}
                 className={(props.someTaskChecked) ? "btn btn--warning edit-header-button" : "btn btn--info edit-header-button"}
                 disabled={(props.someTaskChecked) ? false : true}>
                 {(props.someTaskChecked) ? 'Mark checked as incomplete' : ''}
               </button>
             </div>
             <div className="btn-group" role="group">
               <button
                 type="button"
                 className={(props.someTaskChecked) ? "btn btn--danger edit-header-button" : "btn btn--info edit-header-button"}
                 onClick={(e) => props.handleEditButtons('delete')}
                 disabled={(props.someTaskChecked) ? false : true}>
                 {(props.someTaskChecked) ? 'Delete all checked' : ''}
               </button>
             </div>
           </div>
         </div>
      );
}

TodoEditButtons.propTypes = {
      handleEditButtons: PropTypes.func.isRequired,
      someTaskChecked: PropTypes.bool.isRequired
}

export default TodoEditButtons;