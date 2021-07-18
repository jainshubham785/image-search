/** @format */
import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Gallery from './components/Gallery/Gallery';

function App() {
	const [input, setInput] = useState('');

	const searchPhotos = (query) => {
		setInput(query);
	};

	return (
		<>
			<Header searchPhotos={searchPhotos} />
			<Gallery input={input} />
		</>
	);
}

export default App;
