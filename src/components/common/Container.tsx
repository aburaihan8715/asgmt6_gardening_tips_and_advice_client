import React, { ReactNode } from 'react';

const Container = ({ children }: { children: ReactNode }) => {
  return <div className="md:px-10">{children}</div>;
};

export default Container;
