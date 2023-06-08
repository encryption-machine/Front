import styles from './Header.module.scss';
import IconUser from '../../img/user.svg';
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
			<div className={styles.container}>
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
					<div>
            {/* скорее всего заменить кнопки на Link, когда будут страницы регистрации и авторизации */}
						{!loggedIn ? (
							<button type="button" onClick={handleLogin}>
								Вход
							</button>
						) : (
							<button type="button" onClick={handleLogout}>
								Выйти
							</button>
						)}
						<img src={IconUser} />
					</div>
					{loggedIn && <p>maggggggggggggggggil@mail.ru</p>}
				</div>
			</div>
		</header>
	);
};
