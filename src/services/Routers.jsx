import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainPage, ProfilePage } from '../pages';
import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';

export const Routers = () => {
	return (
		<>
			<Header />
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
