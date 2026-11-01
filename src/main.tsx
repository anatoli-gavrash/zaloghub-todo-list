import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import '@styles/global/base.scss';
import '@styles/global/typography.scss';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
