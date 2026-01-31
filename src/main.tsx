import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { NewGamePage } from './pages/NewGamePage';
import { GamePage } from './pages/GamePage';
import { TutorialPage } from './pages/TutorialPage';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new-game" element={<NewGamePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/tutorial" element={<TutorialPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
