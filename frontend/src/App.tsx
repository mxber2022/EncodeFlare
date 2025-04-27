import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RaffleCreator from "./pages/RaffleCreator";
import RaffleResults from "./pages/RaffleResults";
import SpinnerGame from "./pages/SpinnerGame";
import Layout from "./components/Layout";
import TransactionStatus from "./components/TransactionStatus";
import { RaffleProvider, useRaffle } from "./context/RaffleContext";
import "./config/appkit";

const AppContent = () => {
  const { transaction } = useRaffle();

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<RaffleCreator />} />
            <Route path="/results" element={<RaffleResults />} />
            <Route path="/spinner" element={<SpinnerGame />} />
          </Route>
        </Routes>
      </Router>
      <TransactionStatus transaction={transaction} />
    </>
  );
};

function App() {
  return (
    <RaffleProvider>
      <AppContent />
    </RaffleProvider>
  );
}

export default App;
