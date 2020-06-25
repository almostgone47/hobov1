import React from 'react';
import Header from '../components/shared/Header';

const Layout = (props) => {
  return (
    <div>
      <Header />
      <div className="container">{props.children}</div>
    </div>
  );
};

export default Layout;
