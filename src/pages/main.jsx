import React from 'react';
import { Machine } from '../components/Machine/Machine';

export const MainPage = () => {
	const dataMachine = [
		'Азбука Морзе',
		'QR код',
		'AES (Advanced Encryption Standard)',
		'Шифр Виженера',
		'DSA (Digital Signature Algorithm)',
		'Код Цезаря',
	];
	return (
		<div className="layout">
			<Machine list={dataMachine} />
		</div>
	);
};
