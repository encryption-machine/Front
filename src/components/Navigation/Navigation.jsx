import { Link } from 'react-router-dom';
import styles from './Navigation.module.scss';
import arrow from '../../assets/icons/arrow-right.svg';

export const Navigation = () => {
    return (
        <section className={styles.navigation}>
            <div className={styles.container}>
                <Link
                    to={'/'}
                    className={styles.link}
                >
                    Главная
                </Link>
                <img src={arrow} alt='navigation' />
                <h2 className={styles.currentPosition}>
                    Личный кабинет
                </h2>
            </div>
        </section >
    )
}