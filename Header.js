import React from 'react';
import { Link } from 'react-router-dom'

const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Add Comic</Link></li>
        <li><Link to='/comics'>Edit Comics</Link></li>
        <li><Link to='/titles'>List All Titles</Link></li>
      </ul>
    </nav>
  </header>
)


export default Header;