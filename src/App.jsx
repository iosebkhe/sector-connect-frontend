import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import UserForm from './components/UserForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user-form" element={<UserForm />} />
      </Routes>
    </Router>
  );
};

export default App;
