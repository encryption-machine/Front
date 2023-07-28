import { OurTeamInfo } from './OurTeam.constants';
import styles from './OurTeam.module.scss';
import telegramIcon from '../../assets/icons/team-teledram.svg';
import internetIcon from '../../assets/icons/team-be.svg';
import gitIcon from '../../assets/icons/team-git.svg';

const OurTeam = () => {
  return (
    <section className={styles.ourTeam} id="ourTeam">
      <div className={styles.ourTeam_content}>
        <h1 className={styles.ourTeam_title}>НАША КОМАНДА</h1>
        <div className={styles.ourTeam_cards}>
          <ul className={styles.ourTeam_container}>
            {OurTeamInfo.map(
              ({
                id,
                image,
                titleCard,
                subtitle,
                telegram,
                internet,
                github,
              }) => (
                <li className={styles.ourTeam_card} key={id}>
                  <img
                    className={styles.ourTeam_photo}
                    src={image}
                    alt={titleCard}
                  />
                  <div className={styles.ourTeam_cardContent}>
                    <h3 className={styles.ourTeam_titleCard}>{titleCard}</h3>
                    <p className={styles.ourTeam_subtitle}>{subtitle}</p>
                    <nav>
                      <ul className={styles.ourTeam_links}>
                        <li>
                          <a href={telegram} className={styles.ourTeam_link}>
                            <img
                              className={styles.ourTeam_icon}
                              src={telegramIcon}
                              alt="telegram"
                            />
                          </a>
                        </li>
                        <li hidden={!internet}>
                          <a href={internet} className={styles.ourTeam_link}>
                            <img
                              className={styles.ourTeam_icon}
                              src={internetIcon}
                              alt="internet"
                            />
                          </a>
                        </li>
                        <li hidden={!github}>
                          <a href={github} className={styles.ourTeam_link}>
                            <img
                              className={styles.ourTeam_icon}
                              src={gitIcon}
                              alt="git"
                            />
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
