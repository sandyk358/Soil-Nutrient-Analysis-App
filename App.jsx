import React, { useState, useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const styles = {
  global: {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: '#f5f7fa',
    color: '#333',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  app: {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  authContainer: {
    width: 350,
    background: 'white',
    padding: '2rem',
    borderRadius: 12,
    boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '1rem',
  },
  hero: {
    textAlign: 'center',
    padding: '4rem 2rem',
    backgroundImage: "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1350&q=80')",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    color: 'white',
    borderRadius: 12,
  },
  nav: {
    background: 'linear-gradient(90deg, #4e54c8, #8f94fb)',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  navUl: {
    display: 'flex',
    listStyle: 'none',
    gap: '1.5rem',
    cursor: 'pointer',
  },
  navLi: {
    transition: '0.3s',
  },
  navLiHover: {
    textDecoration: 'underline',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: 12,
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    transition: '0.3s',
  },
  cardHover: {
    transform: 'translateY(-5px)',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
  },
  input: {
    width: '100%',
    padding: '0.7rem',
    borderRadius: 8,
    border: '1px solid #ccc',
  },
  textarea: {
    width: '100%',
    padding: '0.7rem',
    borderRadius: 8,
    border: '1px solid #ccc',
  },
  button: {
    padding: '0.7rem 1.5rem',
    border: 'none',
    borderRadius: 8,
    background: '#4e54c8',
    color: 'white',
    cursor: 'pointer',
    transition: '0.3s',
  },
  buttonHover: {
    background: '#3c40a0',
  },
  section: {
    padding: '2rem',
    animation: 'fadeIn 0.5s ease-in-out',
  },
  fadeInKeyframes: `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `,
  table: {
    borderCollapse: 'collapse',
    textAlign: 'center',
    width: '100%',
  },
  tableBorder: {
    border: '1px solid black',
  },
  photoPreview: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '1rem',
    gap: '1rem',
  },
  photoImg: {
    width: 120,
    height: 120,
    objectFit: 'cover',
    borderRadius: 8,
  },
};

function SoilAnalysisApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [photoFiles, setPhotoFiles] = useState([]);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (isLoggedIn && activeSection === 'dashboard') {
      renderChart();
    }
  }, [isLoggedIn, activeSection]);

  const login = () => {
    setIsLoggedIn(true);
    setActiveSection('home');
  };

  const signup = () => {
    alert('Signup functionality can be added here.');
  };

  const showSection = (sectionId) => {
    setActiveSection(sectionId);
  };

  const previewPhotos = (event) => {
    setPhotoFiles(Array.from(event.target.files));
  };

  const renderChart = () => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }
    const ctx = chartRef.current.getContext('2d');
    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Nitrogen', 'Phosphorus', 'Potassium', 'pH'],
        datasets: [
          {
            label: 'Soil Composition',
            data: [45, 30, 60, 6.5],
            backgroundColor: ['#4e54c8', '#8f94fb', '#3cba92', '#e8c3b9'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
      },
    });
  };

  // Optional: Inline style for nav items with hover effect
  // Using simple stateful hover handling would be verbose, so skipping.

  if (!isLoggedIn) {
    return (
      <div style={styles.authContainer}>
        <h2>Soil Analysis App</h2>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input type="email" id="email" style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Password</label>
          <input type="password" id="password" style={styles.input} />
        </div>
        <button style={styles.button} onClick={login}>
          Login
        </button>
        <p style={{ marginTop: '1rem' }}>
          Don't have an account?{' '}
          <span
            style={{ color: '#4e54c8', cursor: 'pointer' }}
            onClick={signup}
          >
            Sign Up
          </span>
        </p>
      </div>
    );
  }

  return (
    <div style={styles.app}>
      <style>{styles.fadeInKeyframes}</style>
      <nav style={styles.nav}>
        <h1>Soil Analysis</h1>
        <ul style={styles.navUl}>
          {['home', 'dashboard', 'photos', 'analysis', 'reports', 'profile', 'contact'].map((section) => (
            <li
              key={section}
              style={{
                ...styles.navLi,
                textDecoration: activeSection === section ? 'underline' : 'none',
                cursor: 'pointer',
              }}
              onClick={() => showSection(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1).replace(/([A-Z])/g, ' $1')}
            </li>
          ))}
        </ul>
      </nav>

      <section
        style={{ ...styles.section, display: activeSection === 'home' ? 'block' : 'none' }}
        className={activeSection === 'home' ? 'active' : ''}
      >
        <div style={styles.hero}>
          <h2>Welcome to Soil Analysis</h2>
          <p>
            Analyze soil health, upload samples, and get AI-driven insights for
            better farming.
          </p>
          <button style={styles.button} onClick={() => showSection('dashboard')}>
            Go to Dashboard
          </button>
        </div>
      </section>

      <section
        style={{ ...styles.section, display: activeSection === 'dashboard' ? 'block' : 'none' }}
        className={activeSection === 'dashboard' ? 'active' : ''}
      >
        <h2>Dashboard</h2>
        <div style={styles.cardGrid}>
          <div style={styles.card}>Nitrogen: 45%</div>
          <div style={styles.card}>Phosphorus: 30%</div>
          <div style={styles.card}>Potassium: 60%</div>
          <div style={styles.card}>pH: 6.5</div>
        </div>
        <canvas
          id="soilChart"
          ref={chartRef}
          style={{ marginTop: '2rem', maxWidth: '100%' }}
        ></canvas>
      </section>

      <section
        style={{ ...styles.section, display: activeSection === 'photos' ? 'block' : 'none' }}
        className={activeSection === 'photos' ? 'active' : ''}
      >
        <h2>Upload Soil Photos</h2>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={previewPhotos}
          style={{ marginBottom: '1rem' }}
        />
        <div style={styles.photoPreview}>
          {photoFiles.map((file, i) => (
            <img
              key={i}
              src={URL.createObjectURL(file)}
              alt="soil preview"
              style={styles.photoImg}
              onLoad={() => URL.revokeObjectURL(file)}
            />
          ))}
        </div>
      </section>

      <section
        style={{ ...styles.section, display: activeSection === 'analysis' ? 'block' : 'none' }}
        className={activeSection === 'analysis' ? 'active' : ''}
      >
        <h2>AI Analysis</h2>
        <div style={styles.card}>
          <p>Soil condition: Healthy</p>
          <p>Recommendation: Use organic compost to balance nitrogen.</p>
        </div>
      </section>

      <section
        style={{ ...styles.section, display: activeSection === 'reports' ? 'block' : 'none' }}
        className={activeSection === 'reports' ? 'active' : ''}
      >
        <h2>Reports</h2>
        <table style={styles.table} border="1">
          <thead>
            <tr>
              <th style={styles.tableBorder}>Date</th>
              <th style={styles.tableBorder}>N</th>
              <th style={styles.tableBorder}>P</th>
              <th style={styles.tableBorder}>K</th>
              <th style={styles.tableBorder}>pH</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.tableBorder}>12 Aug 2025</td>
              <td style={styles.tableBorder}>45%</td>
              <td style={styles.tableBorder}>30%</td>
              <td style={styles.tableBorder}>60%</td>
              <td style={styles.tableBorder}>6.5</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section
        style={{ ...styles.section, display: activeSection === 'profile' ? 'block' : 'none' }}
        className={activeSection === 'profile' ? 'active' : ''}
      >
        <h2>User Profile</h2>
        <img
          src="https://via.placeholder.com/120"
          alt="profile"
          style={styles.profilePic}
          id="profilePic"
        />
        <div style={styles.formGroup}>
          <label style={styles.label}>Name</label>
          <input type="text" defaultValue="Farmer John" style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input type="email" defaultValue="farmer@example.com" style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Phone</label>
          <input type="text" defaultValue="+91 9876543210" style={styles.input} />
        </div>
        <button style={styles.button}>Update Profile</button>
      </section>

      <section
        style={{ ...styles.section, display: activeSection === 'contact' ? 'block' : 'none' }}
        className={activeSection === 'contact' ? 'active' : ''}
      >
        <h2>Contact Us</h2>
        <div style={styles.formGroup}>
          <label style={styles.label}>Your Message</label>
          <textarea rows="5" style={styles.textarea}></textarea>
        </div>
        <button style={styles.button}>Send</button>
      </section>
    </div>
  );
}

export default SoilAnalysisApp;
