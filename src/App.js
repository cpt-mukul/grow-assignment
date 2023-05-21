import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FirstPage from './FirstPage';
import SecondPage from './SecondPage';

const App = () => {
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));

  return (
    <Router>
      <Routes>
        <Route path="/" element={userDetails ? <Navigate to="/second" /> : <FirstPage />} />
        <Route
          path="/second"
          element={!userDetails ? <Navigate to="/" /> : <SecondPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;
