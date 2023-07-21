import { OutTeamInfo } from './OutTeam.constants';
import styles from './OurTeam.module.scss';
import telegramIcon from '../../assets/icons/team-teledram.svg';
import internetIcon from '../../assets/icons/team-be.svg';
import gitIcon from '../../assets/icons/team-git.svg';
import { OutTeamInfoLast } from './OutTeam.constants';

const OutTeam = () => {
 
  return (
    <section className={styles.outTeam}>
      <h1 className={styles.outTeam_title}>НАША КОМАНДА</h1>
      <div className={styles.outTeam_cards}>
        <ul className={styles.outTeam_container}>
          {OutTeamInfo.map(({ id, titleCard, subtitle, telegram, internet, github}) => (
            <li className={styles.outTeam_card} key={id}>
              <div className={styles.outTeam_photo}></div>
              <div className={styles.outTeam_cardContent}>
                <h3 className={styles.outTeam_titleCard}>{titleCard}</h3>
                <p className={styles.outTeam_subtitle}>{subtitle}</p>
                <nav>
                  <ul className={styles.outTeam_links}>
                    <li>
                      <a href={telegram} className={styles.outTeam_link}>
                        <img className={styles.outTeam_icon} src={telegramIcon} alt='telegram'/>
                      </a>
                    </li>
                    <li hidden={!internet}>
                      <a href={internet} className={styles.outTeam_link}>
                        <img className={styles.outTeam_icon} src={internetIcon} alt='internet'/>
                      </a>
                    </li>
                    <li hidden={!github}>
                      <a href={github} className={styles.outTeam_link}>
                        <img className={styles.outTeam_icon} src={gitIcon} alt='git'/>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </li>
          ))}
        </ul>
        <ul className={styles.outTeam_containerLast}>
          {OutTeamInfoLast.map(({ id, titleCard, subtitle, telegram, internet, github }) => (
            <li className={styles.outTeam_cardLast} key={id}>
              <div className={styles.outTeam_photo}></div>
              <div className={styles.outTeam_cardContent}>
                <h3 className={styles.outTeam_titleCard}>{titleCard}</h3>
                <p className={styles.outTeam_subtitle}>{subtitle}</p>
                <nav>
                  <ul className={styles.outTeam_links}>
                    <li>
                      <a href={telegram} className={styles.outTeam_link}>
                        <img className={styles.outTeam_icon} src={telegramIcon} alt='telegram'/>
                      </a>
                    </li>
                    <li hidden={!internet}>
                      <a href={internet} className={styles.outTeam_link}>
                        <img className={styles.outTeam_icon} src={internetIcon} alt='internet'/>
                      </a>
                    </li>
                    <li hidden={!github}>
                      <a href={github} className={styles.outTeam_link}>
                        <img className={styles.outTeam_icon} src={gitIcon} alt='git'/>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </li>
          ))} 
        </ul>
      </div>
    </section>
  )
};

export default OutTeam;