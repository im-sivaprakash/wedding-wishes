import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WeddingForm from './Components/WeddingForm';
import Wishes from './Components/Wishes';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeddingForm />} />
        <Route path="/wishes" element={<Wishes />} />
      </Routes>
    </Router>
  );
}

export default App;
