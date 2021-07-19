/** @format */

import React, { useState, useEffect } from 'react';
import { parseString } from 'xml2js';
import Modal from 'react-modal';
import '../Gallery/Gallery.css';

Modal.setAppElement('#root');
const Gallery = ({ input }) => {
	const [photos, setPhotos] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState({
		state: false,
		photoUrl: '',
	});

	const generateUrl = (data) => {
		if (data.rsp.photos[0].$.total === '0') {
		} else {
			const photosUrl = data.rsp.photos[0].photo.map((item) => {
				const { id, secret, server } = item.$;
				const url = `https://live.staticflickr.com/${server}/${id}_${secret}_`;
				return url;
			});
			setPhotos(photosUrl);
		}
	};

	const getPhotos = async () => {
		try {
			fetch(
				`https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=d1554218567bfe198c78fc3c2b68b48b`
			)
				.then((res) => res.text())
				.then((resText) => {
					parseString(resText, (err, data) => {
						generateUrl(data);
					});
				});
		} catch (err) {
			console.log(err);
		}
	};

	const getInputPhotos = async (input) => {
		try {
			fetch(
				`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=d1554218567bfe198c78fc3c2b68b48b&text=${input}`
			)
				.then((res) => res.text())
				.then((resText) => {
					parseString(resText, (err, data) => {
						generateUrl(data);
					});
				});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		input === '' && getPhotos();
	}, []);

	useEffect(() => {
		input.length > 2 && getInputPhotos(input);
	}, [input]);

	return (
		<>
			<div className='Gallery__container'>
				{photos.map((photo, index) => {
					return (
						<div key={index}>
							<img
								onClick={() =>
									setIsModalOpen({ state: true, photoUrl: { photo } })
								}
								className='Gallery__img'
								src={`${photo}n.jpg`}
								alt=''
							/>
							<Modal
								style={{
									overlay: {
										backgroundColor: 'lightgray',
									},
									content: {
										backgroundColor: 'white',
									},
								}}
								className='modal'
								isOpen={isModalOpen.state}
								onRequestClose={() =>
									setIsModalOpen({ ...isModalOpen, state: false })
								}>
								<img src={`${isModalOpen.photoUrl.photo}b.jpg`} />
							</Modal>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Gallery;
