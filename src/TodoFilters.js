import React from 'react';
import PropTypes from 'prop-types';

function TodoFilters(props) {
  return (
    <div className="filters">
      <ul className="nav nav--pills filter-buttons">
        <li className="nav__item filter-1 filter">
          <a
            className={(props.currentFilter === 1) ? "nav__link active" : "nav__link"}
            onClick={(e) => props.changeFilter(1)}>
            All items
          </a>
        </li>
        <li className="nav__item filter-2 filter">
          <a
            className={(props.currentFilter === 2) ? "nav__link active" : "nav__link"}
            onClick={(e) => props.changeFilter(2)}>Complete items</a>
        </li>
        <li className="nav__item filter-3 filter">
          <a
            className={(props.currentFilter === 3) ? "nav__link active" : "nav__link"}
            onClick={(e) => props.changeFilter(3)}>
            Still to do
          </a>
        </li>
      </ul>
    </div>
  )
}

TodoFilters.propTypes = {
      currentFilter: PropTypes.number.isRequired,
      changeFilter: PropTypes.func.isRequired
}

export default TodoFilters;