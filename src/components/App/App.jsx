import React from 'react';
import { Routers } from '../../services/Routers';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';

function App() {
	return (
		<div className="App">
			<Router>
				<Routers />
			</Router>
		</div>
	);
}

export default App;
