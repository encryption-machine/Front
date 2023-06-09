import React, { useRef, useEffect, useState } from 'react';
import { Chevron, Copy } from '../Icons';
import { copyToClipboard } from '../../helpers';
import styles from './Machine.module.scss';

export const Machine = ({ list }) => {
	const [current, setCurrent] = React.useState('encryption');
	const [isSelectOpen, setSelectOpen] = React.useState(false);
	const [selected, setSelected] = React.useState(list[0]);
	const [filteredList, setFilteredList] = React.useState(
		list.filter((item) => item !== selected)
	);
	const [result, setResult] = React.useState(
		"fuck you, I wan't do what you tell me"
	);
	const [isCopyShow, setIsCopyShow] = useState(false);
	const [copyMessage, setCopyMessage] = useState('');
	const [encryption, SetEncryption] = useState('');
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
		// в случае успеха код ниже
		setSelected(value);
		setFilteredList(list.filter((item) => item !== value));
		selectClick();
	};

	const copyCode = () => {
		try {
			copyToClipboard(result);
			setCopyMessage('Результат скопирован');
		} catch (error) {
			setCopyMessage('Неудалось скопировать');
		} finally {
			showMessage();
		}
	};

	const showMessage = () => {
		setIsCopyShow(true);
		setTimeout(() => {
			setIsCopyShow(false);
		}, 2000);
	};

	useEffect(() => {
		const handleClick = (event) => {
			if (
				isSelectOpen &&
				selectRef.current &&
				!selectRef.current?.contains(event.target)
			) {
				selectClick();
			}
		};
		window.addEventListener('click', handleClick);
		return () => {
			window.removeEventListener('click', handleClick);
		};
	}, []);

	const selectClasses = !isSelectOpen
		? styles.machine__select
		: `${styles.machine__selectOpen} ${styles.machine__select}`;

	const copyClasses = !isCopyShow
		? styles.machine__copyMessage
		: `${styles.machine__copyMessageShow} ${styles.machine__copyMessage}`;

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
			<div>
				<textarea
					name="leftArea"
					id="leftArea"
					className={styles.machine__text}
					placeholder="Введите текст"
					value={encryption}
					onChange={SetEncryption}
				></textarea>
			</div>
			<div className={styles.machine__copyCont}>
				<div className={copyClasses}>Результат Скопирован</div>
				<textarea
					name="rightArea"
					id="rightArea"
					className={styles.machine__text}
					placeholder="Результат"
					value={result}
					readOnly
				></textarea>
				<button onClick={copyCode} className={styles.machine__copyButton}>
					<Copy />
				</button>
			</div>
		</div>
	);
};
