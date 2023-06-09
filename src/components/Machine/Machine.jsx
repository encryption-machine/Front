import React, { useRef, useEffect } from 'react';
import { Chevron } from '../Icons';
import styles from './Machine.module.scss';

export const Machine = ({ list }) => {
	const [current, setCurrent] = React.useState('encryption');
	const [isSelectOpen, setSelectOpen] = React.useState(false);
	const [selected, setSelected] = React.useState(list[0]);
	const [filteredList, setFilteredList] = React.useState(
		list.filter((item) => item !== selected)
	);
	const selectRef = useRef(null);
	const activeClass = styles.machine__tabActive;

	const clickTab = (event) => {
		setCurrent(event.target.value);
	};

	const selectClick = () => {
		const hideBlock = document.getElementById('hide');
		const height =
			'height: ' + document.getElementById('list').offsetHeight + 'px';

		if (isSelectOpen) {
			hideBlock.setAttribute('style', 'height:0px');
		} else {
			hideBlock.setAttribute('style', height);
		}

		setSelectOpen(!isSelectOpen);
	};

	const choiceType = (e, value) => {
		// здесь будет запрос к серверу
		setSelected(value);
		setFilteredList(list.filter((value) => value !== selected));
		selectClick();
	};

	useEffect(() => {
		const handleClick = (event) => {
			if (selectRef.current && !selectRef.current?.contains(event.target)) {
				selectClick();
			}
		};
		window.addEventListener('click', handleClick);
		return () => {
			window.removeEventListener('click', handleClick);
		};
	}, [isSelectOpen]);

	const selectClasses = !isSelectOpen
		? styles.machine__select
		: styles.machine__selectOpen;

	return (
		<div className={styles.machine}>
			<div className={styles.machine__switch}>
				<button
					className={`${styles.machine__tab} ${
						current === 'encryption' ? activeClass : ''
					}`}
					value="encryption"
					onClick={clickTab}
				>
					Шифрование
				</button>
				<button
					className={`${styles.machine__tab} ${
						current === 'decryption' ? activeClass : ''
					}`}
					value="decryption"
					onClick={clickTab}
				>
					Дешифрование
				</button>
			</div>
			<div>
				<div className={selectClasses} ref={selectRef}>
					<div className={styles.machine__selectTitle} onClick={selectClick}>
						{selected}
						<div className={styles.machine__selectIcon}>
							<Chevron />
						</div>
					</div>
					<div className={styles.machine__selectHide} id="hide">
						<ul className={styles.machine__selectList} id="list">
							{filteredList.map((item) => (
								<li
									key={item}
									className={styles.machine__selectOtion}
									onClick={(event) => choiceType(event, item)}
								>
									{item}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};
