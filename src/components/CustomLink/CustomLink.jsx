import styles from './CustomLink.module.scss';

export const CustomLink = ({ href, target, onClick, children }) => {
  return (
    <a className={styles.link} href={href} target={target} onClick={onClick}>
      {children}
    </a>
  );
};
