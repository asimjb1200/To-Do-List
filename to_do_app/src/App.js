import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import Header from './components/layout/Header';
import About from './components/pages/About';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    todos: []
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(res => this.setState({ todos: res.data }))
  }


  // mark an item as complete
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    }) });
  }

  // delete an item
  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.setState({ todos: [...this.state.todods.filter(todo => todo.id !== id)] }));  
  }

  addTodo = (title) => {
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title: title,
      completed: false
    })
      .then(res => 
        this.setState({todos: [...this.state.todos, res.data]}));
  }

  render() {
    
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
              <Route exact path="/" render={props => (//Make the home page load these components
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo} />
                  <Todos todos={ this.state.todos } markComplete={this.markComplete} delTodo={this.delTodo} />
                </React.Fragment>
              )} />
              <Route path="/about" component={About} />
           </div> 
        </div>
      </Router>
    );
  }
}

export default App;
