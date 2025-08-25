import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div 
      style={{
        textAlign: 'center',
        padding: '60px',
        background: 'linear-gradient(135deg, #ff7e5f, #feb47b)',
        minHeight: '100vh',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px' }}>
        Welcome to PillPal
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '40px' }}>
        Your community-driven medicine sharing platform
      </p>

      <div 
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
        }}
      >
        <button
          onClick={() => navigate('/login')}
          style={{
            backgroundColor: '#ffffff',
            color: '#ff7e5f',
            padding: '15px 30px',
            fontSize: '1rem',
            fontWeight: 'bold',
            borderRadius: '30px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#ff7e5f'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
        >
          Login
        </button>
        <button
          onClick={() => navigate('/register')}
          style={{
            backgroundColor: '#ffffff',
            color: '#feb47b',
            padding: '15px 30px',
            fontSize: '1rem',
            fontWeight: 'bold',
            borderRadius: '30px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#feb47b'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
        >
          Register
        </button>
      </div>

      {/* Add a subtle footer text for extra branding */}
      <footer style={{ marginTop: '50px', fontSize: '0.9rem' }}>
        <p>© 2025 PillPal, All rights reserved</p>
      </footer>
    </div>
  );
};

export default Home;

