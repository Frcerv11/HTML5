import React, { Component } from 'react';
import AllTitles from './AllTitles.js'
import Comic from './Comic.js'
import { Link, Switch, Route }   from 'react-router-dom'

const Titles = (props) => (
  <Switch>
     <Route exact path='/titles' render={(e) => (
     	<AllTitles data={props}/>
     )}/>
     <Route path='/titles/:number' render={(e) => (
     	 <Comic propInfo={e} data={props}/>
     )}/>
     
  </Switch>
)

export default Titles;