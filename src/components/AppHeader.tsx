import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AppHeader: React.FC = () => {
  const location = useLocation();
  
  return (
    <header style={{
      backgroundColor: 'white',
      borderBottom: '1px solid #eaeaea',
      padding: '16px 0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <h1 style={{
          margin: 0,
          fontSize: '22px',
          fontWeight: 600,
          color: '#333',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
          }}>
            {/* Network icon */}
            <svg 
              style={{ marginRight: '12px' }} 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#1890ff" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
              <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
              <line x1="6" y1="10" x2="6" y2="14"></line>
              <line x1="18" y1="10" x2="18" y2="14"></line>
            </svg>
            LLDP Network Topology
          </div>
        </h1>
        
        <nav>
          <ul style={{
            display: 'flex',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}>
            <li style={{ marginRight: '20px' }}>
              <Link 
                to="/" 
                style={{
                  ...navLinkStyle,
                  ...(location.pathname === '/' ? activeNavLinkStyle : {})
                }}
              >
                <svg 
                  style={{ marginRight: '8px' }} 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/movements" 
                style={{
                  ...navLinkStyle,
                  ...(location.pathname === '/movements' ? activeNavLinkStyle : {})
                }}
              >
                <svg 
                  style={{ marginRight: '8px' }} 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
                Device Movements
              </Link>
            </li>
            <li>
              <Link 
                to="/NetworkBandwidthDashboard" 
                style={{
                  ...navLinkStyle,
                  ...(location.pathname === '/NetworkBandwidthDashboard' ? activeNavLinkStyle : {})
                }}
              >
                <svg 
                  style={{ marginRight: '8px' }} 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
                Bandwidth Charting
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

// Extracted styles
const navLinkStyle: React.CSSProperties = {
  color: '#666',
  textDecoration: 'none',
  fontSize: '15px',
  fontWeight: 500,
  padding: '8px 12px',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  transition: 'all 0.2s ease',
};

const activeNavLinkStyle: React.CSSProperties = {
  color: '#1890ff',
  backgroundColor: 'rgba(24, 144, 255, 0.1)',
};

export default AppHeader;