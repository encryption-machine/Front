import styles from './Link.module.scss';

export const Link = ({ href, target, onClick, children }) => {
  return (
    <a className={styles.link} href={href} target={target} onClick={onClick}>
      {children}
    </a>
  );
};
