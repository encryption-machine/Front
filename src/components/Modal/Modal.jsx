import React from 'react';

const Overlay = ({ onClose, children, ...props }) => {
  const handleIsOpen = () => onClose(false);
  return (
    <div {...props} onClick={handleIsOpen}>
      {children}
    </div>
  );
};

const Window = ({ children, ...props }) => {
  const handleStopPropagation = (e) => e.stopPropagation();
  return (
    <section {...props} onClick={handleStopPropagation}>
      {children}
    </section>
  );
};

const CloseButton = ({ onClose, children, ...props }) => {
  const handleIsOpen = () => onClose(false);
  return (
    <button {...props} onClick={handleIsOpen}>
      {children}
    </button>
  );
};

let window = Window;
let overlay = Overlay;
let close = CloseButton;

export let Modal = Object.assign(
  { window },
  {
    overlay,
    close,
  }
);
