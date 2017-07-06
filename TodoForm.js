import React, { Component } from 'react';
class TodoForm extends React.Component{
  constructor(props){
    super(props)
  }
  // Input Tracker

  // Return JSX

  // <input ref={node => {
  //   input = node;
  // }} />
  // <button onClick={() => {
  //   addTodo(input.value);
  //   input.value = '';
  // }}>
  //   +
  // </button>
  render(){
    return (
      <div>
        <form className="form-style-8" onSubmit={this.props.handleSubmit}>
          <label>
            Title:<input type="text" name="title"/>
            Author:<input type="text" name="author"/>
            description:<input type="text" name="description"/>
            id:<input type="number" name="id"/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
};

export default TodoForm;