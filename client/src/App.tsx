import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PhishingSimulation from './components/PhishingSimulation';
import PhishingAttempts from './components/PhishingAttempts';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<PhishingSimulation />} />
              <Route path="/attempts" element={<PhishingAttempts />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
