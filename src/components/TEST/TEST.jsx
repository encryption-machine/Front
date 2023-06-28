import React from 'react';

const test1 = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

const test2 = ({className}) => {
  return (
    <>
      <span className={className}>test</span>
      <span className={className}>test</span>
    </>
  );
};

export let TEST = Object.assign(
  {test1},
  {
    test2,
  }
);
