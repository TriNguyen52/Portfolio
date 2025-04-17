import React from 'react';
import MathGraph from './MathGraph';

const BackgroundProvider = ({ children }) => {
  return (
    <>
      <MathGraph type="vector" />
      {children}
    </>
  );
};

export default BackgroundProvider;