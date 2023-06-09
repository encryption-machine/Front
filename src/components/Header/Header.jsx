import styles from './Header.module.scss';
import UserIcon from '../../img/user.svg';
import { useState } from 'react';

export const Header = () => {
	const [loggedIn, setLoggedIn] = useState(false);

	const handleLogin = () => {
		console.log('входит');
		setLoggedIn(true);
	};

	const handleLogout = () => {
		console.log('выходит');
		setLoggedIn(false);
	};

	return (
		<header className={styles.header}>
			<div className={styles.header_container}>
				<div className={styles.logo}>Шифровальная машина</div>
				<nav>
					<ul>
						<li>
							<a href="#">Шифрование</a>
						</li>
						<li>
							<a href="#">О проекте</a>
						</li>
						<li>
							<a href="#">О шифрах</a>
						</li>
					</ul>
				</nav>
				<div className={styles.entrance}>
					{/* скорее всего заменить кнопки на Link, когда будут страницы регистрации и авторизации */}
					{!loggedIn ? (
						<button type="button" onClick={handleLogin}>
							Войти
						</button>
					) : (
						<div className={styles.userInfo}>
							<span>mail@mail.ru</span>
							<hr />
							<button type="button" onClick={handleLogout}>
								Выйти
							</button>
						</div>
					)}
					<img className={styles.img} src={UserIcon} />
				</div>
			</div>
		</header>
	);
};
