import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';
import { APP_NAME } from '../config';

describe('Header Component', () => {
  it('should render the favicon', () => {
    render(<Header />);
    const favicon = screen.getByAltText('favicon');
    expect(favicon).toBeInTheDocument();
    expect(favicon).toHaveAttribute('src', `${process.env.PUBLIC_URL}/favicon.ico`);
  });

  it('should render the app name', () => {
    render(<Header />);
    const appName = screen.getByText(APP_NAME);
    expect(appName).toBeInTheDocument();
  });

  it('should render the Giphy logo', () => {
    render(<Header />);
    const giphyLogo = screen.getByAltText('Giphy Logo');
    expect(giphyLogo).toBeInTheDocument();
    expect(giphyLogo).toHaveAttribute('src', expect.stringContaining('giphy-logo.png'));
  });
});