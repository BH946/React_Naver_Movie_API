import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';


import { Global } from "@emotion/react";
// 전역 CSS를 등록할 컴포넌트 가져옴
import { GlobalStyles } from "./index.style";
// Global 컴포넌트에 등록할 전역 CSS 작성한 코드 가져옴

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode></React.StrictMode> 
  <div>
    <App />
    <Global styles={GlobalStyles}/>
  </div>
);

reportWebVitals();
