import { CustomLink } from '../CustomLink/CustomLink';
import styles from './Navigation.module.scss';
import arrow from '../../assets/icons/arrow-right.svg';

export const Navigation = () => {
    return (
        <section className={styles.navigation}>
            <div className={styles.container}>
                <CustomLink
                    to={'/'}
                    target="_self"
                >
                    Главная
                </CustomLink>
                <img src={arrow} alt='navigation' />
                <h2>
                    Личный кабинет
                </h2>

            </div>
        </section>
    )
}