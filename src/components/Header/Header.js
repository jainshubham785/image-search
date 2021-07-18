/** @format */

import React, { useState } from 'react';
import '../Header/Header.css';

const Header = ({ searchPhotos }) => {
	const [input, setInput] = useState('');

	const handleChange = (e) => {
		setInput(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		searchPhotos(input);
	};

	return (
		<>
			<div className='header'>
				<h1 className='header__h1'>Search Photos</h1>
				<div className='wrapper'>
					<form onSubmit={handleSubmit} action=''>
						<div className='header__searchPanel'>
							<input
								onChange={handleChange}
								className='header__input'
								type='text'
								placeholder='Start Typing......'
								value={input}
							/>
							<input className='header__search' type='submit' value='Search' />
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Header;
