import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

// Sayfa başlıklarını route bazlı güncelle
const setTitle = () => {
  const el = document.querySelector('[data-page-title]');
  if (!el) {
    document.title = 'maglo';
    return;
  }
  const label = el.getAttribute('data-page-title');
  document.title = label || 'maglo';
};

window.addEventListener('popstate', setTitle);
window.addEventListener('load', setTitle);
setTimeout(setTitle, 0);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// web vitals kaldırıldı
