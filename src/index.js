import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./index.css";
import App from './pages/App';
import Home from './pages/Home';
import Map from './pages/Map';
import Test from './pages/Test';
import Test2 from './pages/Test2';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/Map" element={<Map />} />
        <Route path="/Test" element={<Test />} />
        <Route path="/Test2" element={<Test2 />} />
      </Routes>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
