import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';

class App extends Component {

    id = 3 // 0,1,2 already exist

    state = {
      input: '',
      todos: [
        { id: 0, text: '리액트 소개', checked: false },
        { id: 1, text: 'JSX 사용해보기', checked: true },
        { id: 2, text: '라이프 사이클 이해하기', checked: false },
      ]
    }

    handleChange = (e) => {
        this.setState({
            input: e.target.value // input's next value
        });
    }

    handleCreate = () => {
        const { input, todos } = this.state;
        this.setState ({
            input:'', // clean input
            todos: todos.concat({ //using concat, add to an array
                id: this.id++,
                text: input,
                checked: false
            })
        });
    }

    handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            this.handleCreate();
        }
    }

    handleToggle = (id) => {
        const {todos} = this.state;

        // with id from parameter, find how many items so far.
        const index = todos.findIndex(todo => todo.id === id);
        const selected = todos[index]; //selected object

        const nextTodos = [...todos]; //copy the array

        // 기존의 값을 복사하고, checked 값을 덮어쓰기
        nextTodos[index] = {
            ...selected,
            checked: !selected.checked
        };

        this.setState({
            todos: nextTodos
        });
    }

    handleRemove = (id) => {
        const {todos} = this.state;
        this.setState({
            todos: todos.filter(todo => todo.id !==id)
        });
    }

  render() {
      const { input, todos } = this.state;
      const {
          handleChange,
          handleCreate,
          handleKeyPress,
          handleToggle,
          handleRemove
      } = this;

    return (
          <TodoListTemplate form = {(
              <Form
                  value = {input}
                  onChange={handleChange}
                  onCreate={handleCreate}
                  onKeyPress={handleKeyPress}
              />
          )}>
              <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
          </TodoListTemplate>
    );
  }
}

export default App;
