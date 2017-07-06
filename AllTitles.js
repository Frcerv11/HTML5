import React, { Component } from 'react';
import Titles from './Titles.js'
import { Link } from 'react-router-dom'

const AllTitles = (props) => {
	const comics = props.data.comics

	return (
		<ul>
			{Object.keys(comics).map(i => {
				return <li key={i}> <Link to={`/titles/${i}`}>{comics[i].title}</Link> </li>
			})}
		</ul>
		
		
	);
};
export default AllTitles;