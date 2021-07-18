/** @format */
import React, { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Gallery from './components/Gallery/Gallery'

function App() {
	const [input, setInput] = useState('')
	const [pageNumber, setPageNumber] = useState(1)

	const searchPhotos = query => {
		setInput(query)
	}

	useEffect(() => {
		window.addEventListener('scroll', () => {
			if (
				window.scrollY + window.innerHeight >=
				document.documentElement.scrollHeight
			) {
				setPageNumber(pageNumber + 1)
			}
		})
	})

	return (
		<>
			<Header searchPhotos={searchPhotos} />
			<Gallery input={input} pageNumber={pageNumber} />
		</>
	)
}

export default App
