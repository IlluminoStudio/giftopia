import React from 'react';
import { APP_NAME } from '../config';

const Header: React.FC = () => {
  return (
    <header className="header">
      <img src={`${process.env.PUBLIC_URL}/favicon.ico`} alt="favicon" className="header-icon" />
      <h1 className="header-title">{APP_NAME}</h1>
    </header>
  );
};

export default React.memo(Header);
