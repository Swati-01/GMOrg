import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import SecondPage from './components/SecondPage';
import UserForm from './components/UserForm';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/second-page" element={<SecondPage />} />
      </Routes>
    </Router>
  );
};

export default App;
