import React, { Component } from 'react';
import './TodoApp.css';
import '../node_modules/@dmsi/wedgekit/wedgekit.css';
import Period from './Period.js';
import TodoItem from './TodoItem.js';
import TodoInput from './TodoInput.js';
import TodoFooter from './TodoFooter.js';
import TodoHeaderButtons from './TodoHeaderButtons.js';
import TodoEditButtons from './TodoEditButtons.js';

class TodoApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updatedTodo: '',
      items: JSON.parse(localStorage.getItem('Items')) || {},
      currentFilter: 1,
      someTaskCompleted: JSON.parse(localStorage.getItem('someTaskCompleted')) || false,
      incompleteCount: +localStorage.getItem('incompleteCount') || 0,
      editMode: false,
      someTaskChecked: false
    }

    this.handleInput = {
      handleTyping: (event) => { this.setState({updatedTodo: event.target.value}); },
      handleEnter: (event) => {
        if(event.keyCode !== 13) {
          return;
        }

        event.preventDefault();

        var task = this.state.updatedTodo.trim();

        if (task) {
          var newItems = JSON.parse(JSON.stringify(this.state.items));

          newItems[this.getItemKey()] = {
            task: task,
            key: this.getItemKey(),
            completed: false,
            checked: false
          }

          this.setState((prevState) => 
                ({
                  items: newItems,
                  updatedTodo: '',
                  incompleteCount: prevState.incompleteCount + 1
                })
          );
        } else {
            this.setState({updatedTodo: ''});
        }
      }
    }
  }

  getItemKey = () => {
    var prevKey = +localStorage.getItem('prevKey') || 0;

    return prevKey + 1;
  }

  getList = (filterType) => {
      var todoItems = [];
      var prevItems = JSON.parse(JSON.stringify(this.state.items));
    
      for(let key in prevItems) {
        let item = prevItems[key];
        
        if(filterType === 2 && !item.completed) {
          continue;
        }
      
        if(filterType === 3 && item.completed) {
          continue;
        }
      
        todoItems.push(
          <TodoItem
            task={item.task}
            key={item.key}
            id={item.key}
            completed={item.completed}
            editMode={this.state.editMode}
            isChecked={item.checked}
            handleItemButtonPresses={this.handleItemButtonPresses}
          />
        );
      }
    
      return (
        <div className="tasks">
          {todoItems}
        </div>
      )
  }

  changeFilter = (filterType) => {
    this.setState({currentFilter: filterType});
  }

  handleItemButtonPresses = (key, button) => {
    var newItems = JSON.parse(JSON.stringify(this.state.items));

    switch(button) {
      case 'complete': {
        newItems[key].completed = !newItems[key].completed;
        break;
      }

      case 'check': {
        (function handleChecked() {newItems[key].checked = !newItems[key].checked})();
        break;
      }

      case 'delete': {
        delete newItems[key];
        break;
      }

      default: {
        throw new Error("unknown button type. cases are 'complete', 'check', and 'delete'");
      }
    }

    this.setState((prevState) => ({
      items: newItems,
      incompleteCount: this.countActiveTasks(newItems),
      someTaskCompleted: this.someTaskCompleted(newItems),
      someTaskChecked: this.someTaskChecked(newItems)
    }));
  }

  handleHeaderButtons = (button) => {
    var newItems = JSON.parse(JSON.stringify(this.state.items));

    switch(button) {
      case 'delete-completed': {
        for(let key in newItems) {
          if(newItems[key].completed === true) {
            delete newItems[key];
          }
        }

        break;
      }

      case 'change-complete-status': {
        let allItemsComplete = true;
        for(let key in newItems) {
          if(newItems[key].completed === false) {
            allItemsComplete = false;
            break;
          }
        }

        for(let key in newItems) {
          newItems[key].completed = (allItemsComplete) ? false : true;
        }

        break;
      }

      case 'delete-all': {
        localStorage.clear();

        newItems = {};

        break;
      }

      default: {
        throw new Error ("unknown header button type. cases are 'delete-completed', 'change-complete-status', and 'delete-all'");
      }
    }

    this.setState({
      items: newItems,
      someTaskCompleted: this.someTaskCompleted(newItems),
      incompleteCount: this.countActiveTasks(newItems)
    });
  }

  handleEditButtons = (button) => {
    var newItems = JSON.parse(JSON.stringify(this.state.items));

    switch(button) {
        case 'complete': case 'active': {
          for(let key in newItems) {
            if(newItems[key].checked) {
              newItems[key].completed = (button === 'complete') ? true : false;
            }
          }

          break;
        }

        case 'delete': {
          for(let key in newItems) {
            if(newItems[key].checked) {
              delete newItems[key];
            }
          }

          break;
        }

        default: {
          throw new Error ("unknown edit-button type. cases are 'complete', 'active', and 'delete'");
        }
      }

    this.setState({
      items: newItems,
      someTaskCompleted: this.someTaskCompleted(newItems),
      incompleteCount: this.countActiveTasks(newItems),
      someTaskChecked: this.someTaskChecked(newItems)
    });
  }

  handleEditModePress = () => {
    this.setState((prevState)=> {
      for(let key in prevState.items) {
        prevState.items[key].checked = false;
      }

      return {
        editMode: !prevState.editMode,
        items: prevState.items,
        someTaskChecked: this.someTaskChecked(prevState.items)
      }
    });
  }

  someTaskCompleted = (items) => {
    for(let key in items) {
      if(items[key].completed) {
        return true;
      }
    }

    return false;
  }

  someTaskChecked = (items) => {
    for(let key in items) {
      if(items[key].checked) {
        return true;
      }
    }

    return false;
  }

  countActiveTasks = (items) => {
    var activeTasks = 0;

    for(let key in items) {
      if(!items[key].completed) {
        activeTasks++;
      }
    }

    return activeTasks;
  }

  render() {
    localStorage.setItem('Items', JSON.stringify(this.state.items));
    localStorage.setItem('someTaskCompleted', this.someTaskCompleted(this.state.items));
    localStorage.setItem('incompleteCount', this.countActiveTasks(this.state.items));
    localStorage.setItem('prevKey', this.getItemKey());

    return (
      <div className="App">
        <div className="header">
          <h1 className="display-1 title">to do<Period /></h1>
          <h5 className="description">
            a handy application to remember what you need to get done
            <Period class="description-period"/>
          </h5>
          
          <TodoInput
            updatedTodo={this.state.updatedTodo}
            handleInput={this.handleInput}
          />

          {
            (this.state.editMode)
            
            ?
            
            <TodoEditButtons
              handleEditButtons={this.handleEditButtons}
              someTaskChecked={this.state.someTaskChecked}
            />
            
            :

            <TodoHeaderButtons
              handleHeaderButtons={this.handleHeaderButtons}
              someTaskCompleted={this.state.someTaskCompleted}
            />
          }
        </div>

        {this.getList(this.state.currentFilter)}

        <TodoFooter
          currentFilter={this.state.currentFilter}
          changeFilter={this.changeFilter}
          incompleteCount={this.state.incompleteCount}
          handleEditModePress={this.handleEditModePress}
          editMode={this.state.editMode}
        />

        <div className="credit-container">
          <p className="credit">developed by Troy Nguyen<Period class="credit-period"/></p>
        </div>
      </div>
    );
  }
}

export default TodoApp;