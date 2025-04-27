import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RaffleCreator from './pages/RaffleCreator';
import RaffleResults from './pages/RaffleResults';
import SpinnerGame from './pages/SpinnerGame';
import Layout from './components/Layout';
import { RaffleProvider } from './context/RaffleContext';
import './config/appkit';

function App() {
  return (
    <RaffleProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<RaffleCreator />} />
            <Route path="/results" element={<RaffleResults />} />
            <Route path="/spinner" element={<SpinnerGame />} />
          </Route>
        </Routes>
      </Router>
    </RaffleProvider>
  );
}

export default App;