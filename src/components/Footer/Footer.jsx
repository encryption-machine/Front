import styles from './Footer.module.scss';
import TelegramIcon from '../../img/telegram.svg';

export const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<ul className={styles.contacts}>
					<li>Контакты</li>
					<li>8(800) 234-12-36</li>
					<li>
						<a
							href="https://web.telegram.org/"
							target="_blank"
							rel="noreferrer"
						>
							<img src={TelegramIcon} alt="telegram" />
						</a>
					</li>
				</ul>
				<p>2023</p>
			</div>
		</footer>
	);
};
