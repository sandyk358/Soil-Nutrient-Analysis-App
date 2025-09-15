import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate
} from 'react-router-dom';
import './styles.css';

// Login Page
const LoginPage = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      console.log('Logging in with:', { email, password });
      setIsAuthenticated(true);
      navigate('/home');
    } else {
      alert('Please enter both email and password.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome Back!</h2>
        <p>Login to access your soil analysis dashboard.</p>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="auth-button">Login</button>
        </form>
        <p className="switch-auth">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

// Signup Page
const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (username && email && password) {
      console.log('Signing up with:', { username, email, password });
      alert('Signup successful! Please log in.');
      navigate('/login');
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p>Get started with your soil analysis journey.</p>
        <form onSubmit={handleSignup}>
          <div className="input-group">
            <label>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="auth-button">Sign Up</button>
        </form>
        <p className="switch-auth">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

// Home Page
const HomePage = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  const soilData = {
    id: 'SAMPLE-001',
    date: '2025-08-04',
    nutrients: {
      nitrogen: { value: 25, unit: 'ppm', status: 'Low' },
      phosphorus: { value: 50, unit: 'ppm', status: 'Optimal' },
      potassium: { value: 120, unit: 'ppm', status: 'High' },
    },
    recommendation:
      'Add a nitrogen-rich fertilizer. Avoid high-potassium amendments for the next 6 months.',
  };

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>Soil Nutrient Analysis</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>
      <main className="dashboard">
        <div className="card analysis-card">
          <h2>Analysis for Sample: {soilData.id}</h2>
          <p><strong>Analysis Date:</strong> {soilData.date}</p>
          <div className="nutrients-grid">
            {Object.entries(soilData.nutrients).map(([key, data]) => (
              <div key={key} className={`nutrient-item status-${data.status.toLowerCase()}`}>
                <h3>{key}</h3>
                <p className="nutrient-value">{data.value} {data.unit}</p>
                <p className="nutrient-status">{data.status}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="card recommendation-card">
          <h2>AI-Powered Recommendations</h2>
          <p>{soilData.recommendation}</p>
        </div>
        <div className="card upload-card">
          <h2>Analyze a New Sample</h2>
          <p>Upload a photo of your soil sample to get started.</p>
          <input type="file" className="upload-input" />
          <button className="auth-button">Analyze</button>
        </div>
      </main>
    </div>
  );
};

// App Component
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/home"
          element={isAuthenticated ? <HomePage setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;