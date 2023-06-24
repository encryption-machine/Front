
import styles from './main-layout.module.scss';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className={styles.main_layout}>
      <Header />
      <section className={styles.content}>
        <Outlet />
      </section>
      <Footer />
    </div>
  );
}
