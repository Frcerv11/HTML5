import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Item from './Item.js';
import TodoForm from './TodoForm.js'
import {EditComic} from './EditComic.js'
import Header from './Header.js'
import Titles from './Titles.js'
import { Link, Switch, Route }   from 'react-router-dom'

console.clear();

// Contaner Component (Ignore for now)
class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      comics:{
        comic1: {
          title: "Spiderman",
          author: "author's name",
          description: "temp",
          id:999,
          edit:false,
          active:false
        },
        comic2: {
          title: "Captain America",
          author: "author's name",
          description: "temp",
          id:949,
          edit:false,
          active:false
        }
      }
    }
    this.remove = this.remove.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleClass = this.toggleClass.bind(this)
    this._editInfo = this._editInfo.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(e){
    e.preventDefault();
    const temp = {
      title: e.target.title.value,
      author: e.target.author.value,
      description: e.target.description.value,
      id: e.target.id.value,
      edit: false,
      active: false
    }
    let d = new Date();
    const comics = this.state.comics
    const keyName = "comic-" + d.getTime()
    comics[keyName] = temp

    this.setState({comics})
  }

  remove(task){
    var comics = this.state.comics
    delete comics[task]
    this.setState({comics})
  }

  _editInfo(index){
   
    const currentState = this.state.comics[index].edit;

    var comics = this.state.comics;

    comics[index].edit = !currentState
    this.setState({comics})
  }

  toggleClass(task) {
    const currentState = this.state.comics[task].active;

    var comics = this.state.comics
    var comic = this.state.comics[task]
    const temp = {
      ...comic,
      active:!currentState
    }
    comics[task] = temp

    this.setState({comics:comics})

    // console.log(comics[task])
    // this.setState({ active: !currentState });
  }

  handleChange(event,inputName, index){
    const comics = this.state.comics
    const comic = this.state.comics[index]
    comic[inputName] = event.target.value
    comics[index] = comic
    this.setState({comics})
    
    // this.setState({ contact: contact });

  }
  render(){
    return (
      <div>
        <Header />
        <div id="main">
          <Switch>
            <Route exact path='/' render={(props) => (
              <TodoForm handleSubmit={this.handleSubmit}/>
            )}/>

            <Route path='/comics' render={(props) => (
              <EditComic handleChange={this.handleChange} data={this.state.comics} remove={this.remove} toggleClass={this.toggleClass} _editInfo={this._editInfo}/>
            )}/>
            <Route path='/titles' render={(props) => (
              <Titles comics={this.state.comics}/>
            )}/>    

          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
