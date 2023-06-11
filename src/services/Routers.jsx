import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainPage, ProfilePage } from '../pages';
import { Footer } from '../components/Footer/Footer';

export const Routers = () => {
	return (
		<>
			{/*Здесь должен быть размешен хедер*/}
			<Routes>
				<Route path="/" exact element={<MainPage />} />
			</Routes>
			<Routes>
				<Route path="/profile" exact element={<ProfilePage />} />
			</Routes>
			<Footer />
		</>
	);
};
