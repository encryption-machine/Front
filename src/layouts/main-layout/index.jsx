import styles from './main-layout.module.scss';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import CookiePopup from '../../components/CookiePopup/CookiePopup';

const MainLayout = observer(() => {
  return (
    <div className={styles.main_layout}>
      <Header />
      <section>
        <Outlet />
      </section>
      <Footer />
      <CookiePopup />
    </div>
  );
});

export default MainLayout;
