import React from 'react';
import { Routers } from '../../services/Routers';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import AboutProject from '../AboutProject/AboutProject';

function App() {
	return (
		<div className="App">
      <AboutProject/>
			<Router>
				<Routers />
			</Router>
		</div>
	);
}

export default App;
