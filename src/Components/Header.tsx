import React from 'react';
import { APP_NAME } from '../config';
import giphyLogo from '../Assets/giphy-logo.png';

const Header: React.FC = () => {
  return (
    <header className="header">
      <img src={`${process.env.PUBLIC_URL}/favicon.ico`} alt="favicon" className="header-icon" />
      <h1 className="header-title">{APP_NAME}</h1>
      <img src={giphyLogo} alt="Giphy Logo" className="giphy-logo" />
    </header>
  );
};

export default React.memo(Header);
