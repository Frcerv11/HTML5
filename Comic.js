import React, { Component } from 'react';
import Titles from './Titles.js'
import { Link } from 'react-router-dom'

const Comic = (props) => {
	const comicId = props.propInfo.match.params.number;
	const comics = props.data.comics
	const comic = comics[comicId]
	console.log(props.data.comics)
	return (
		<div>
			<h1>{comic.title}</h1>
			<h3>{comic.author}</h3>
			<p>{comic.description}</p>
			<p>{comic.id}</p>
		</div>

	);
};
export default Comic;