export const CustomLink = ({ style, href, target, onClick, children }) => {
  return (
    <a className={style} href={href} target={target} onClick={onClick}>
      {children}
    </a>
  );
};
