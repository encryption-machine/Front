import React from 'react';
import cn from 'classnames';
import style from './Modal.module.scss';

const Modal = ({ isOpen, setIsOpen, children }) => {
  return (
    <div
      className={isOpen ? cn(style.overlay, style.active) : style.overlay}
      onClick={() => setIsOpen(false)}
    >
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        {children}
        <button className={style.close} onClick={() => setIsOpen(false)} />
      </div>
    </div>
  );
};

export default Modal;
