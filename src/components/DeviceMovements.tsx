import React, { useState } from 'react';
import movementsData, { Movement } from './devicedata';

const MovementsPage: React.FC = () => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = movementsData.slice(indexOfFirstItem, indexOfLastItem);
  
  // Total pages
  const totalPages = Math.ceil(movementsData.length / itemsPerPage);
  
  const pageNumbers: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  
  
  // Function to determine device tag color based on device type
  const getDeviceTagStyle = (deviceType: string): React.CSSProperties => {
    const baseStyle = { ...tagStyle };
    
    switch (deviceType) {
      case 'Workstation':
        return { ...baseStyle, backgroundColor: '#e6f7ff', color: '#0090e6' };
      case 'Server':
        return { ...baseStyle, backgroundColor: '#f6f5ff', color: '#6e41c0' };
      case 'Peripheral':
        return { ...baseStyle, backgroundColor: '#fff2f0', color: '#cf1322' };
      case 'Mobile':
        return { ...baseStyle, backgroundColor: '#f6ffed', color: '#52c41a' };
      case 'IoT Device':
        return { ...baseStyle, backgroundColor: '#fff8e6', color: '#e6a700' };
      case 'Security':
        return { ...baseStyle, backgroundColor: '#fff0f6', color: '#eb2f96' };
      case 'Network':
        return { ...baseStyle, backgroundColor: '#e6fffb', color: '#13c2c2' };
      case 'Communication':
        return { ...baseStyle, backgroundColor: '#fcf4de', color: '#ad6800' };
      default:
        return { ...baseStyle, backgroundColor: '#f5f5f5', color: '#666666' };
    }
  };

  return (
    <div style={{
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1100px',
      margin: '0 auto',
    }}>
      <h2 style={{
        fontSize: '24px',
        fontWeight: 600,
        marginBottom: '20px',
        color: '#333'
      }}>Device Movement History</h2>
      <p style={{
        fontSize: '14px',
        color: '#666',
        marginBottom: '20px',
      }}>Showing the historical movement of devices across the network</p>
      
      <div style={{
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        marginBottom: '20px'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          borderSpacing: 0,
        }}>
          <thead>
            <tr style={{
              borderBottom: '1px solid #eaeaea',
              background: '#f9f9f9'
            }}>
              <th style={headerCellStyle}>Device</th>
              <th style={headerCellStyle}>Tag</th>
              <th style={headerCellStyle}>From (Switch:Port)</th>
              <th style={headerCellStyle}>To (Switch:Port)</th>
              <th style={headerCellStyle}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((movement) => (
              <tr key={movement.id} style={{
                borderBottom: '1px solid #eaeaea',
              }}>
                <td style={cellStyle}>{movement.deviceName}</td>
                <td style={cellStyle}>
                  <span style={getDeviceTagStyle(movement.deviceType)}>
                    {movement.deviceType}
                  </span>
                </td>
                <td style={cellStyle}>
                  <div style={cellContentStyle}>
                    <span style={{
                      ...tagStyle,
                      backgroundColor: '#fff8e6',
                      color: '#e6a700'
                    }}>
                      {movement.fromSwitch}
                    </span>
                    <span style={portStyle}>
                      :{movement.fromPort}
                    </span>
                  </div>
                </td>
                <td style={cellStyle}>
                  <div style={cellContentStyle}>
                    <span style={{
                      ...tagStyle,
                      backgroundColor: '#e6f7ff',
                      color: '#0090e6'
                    }}>
                      {movement.toSwitch}
                    </span>
                    <span style={portStyle}>
                      :{movement.toPort}
                    </span>
                  </div>
                </td>
                <td style={cellStyle}>
                  <span style={{
                    color: '#666',
                    fontSize: '14px'
                  }}>
                    {movement.timestamp}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px'
      }}>
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{
            ...paginationButtonStyle,
            opacity: currentPage === 1 ? 0.5 : 1
          }}
        >
          Previous
        </button>
        
        <div style={{ display: 'flex', margin: '0 10px' }}>
          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              style={{
                ...paginationNumberStyle,
                backgroundColor: currentPage === number ? '#1890ff' : 'white',
                color: currentPage === number ? 'white' : '#666'
              }}
            >
              {number}
            </button>
          ))}
        </div>
        
        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={{
            ...paginationButtonStyle,
            opacity: currentPage === totalPages ? 0.5 : 1
          }}
        >
          Next
        </button>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '10px', color: '#999', fontSize: '13px' }}>
        Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, movementsData.length)} of {movementsData.length} movements
      </div>
    </div>
  );
};

// Extracted styles
const headerCellStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '16px',
  fontWeight: 600,
  fontSize: '14px',
  color: '#666'
};

const cellStyle: React.CSSProperties = {
  padding: '12px 16px',
  fontSize: '14px',
  color: '#333'
};

const cellContentStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center'
};

const tagStyle: React.CSSProperties = {
  display: 'inline-block',
  borderRadius: '4px',
  padding: '2px 8px',
  fontSize: '13px',
  fontWeight: 500
};

const portStyle: React.CSSProperties = {
  marginLeft: '4px',
  fontSize: '14px'
};

const paginationButtonStyle: React.CSSProperties = {
  padding: '8px 16px',
  borderRadius: '4px',
  border: '1px solid #d9d9d9',
  backgroundColor: 'white',
  cursor: 'pointer',
  fontSize: '14px',
  color: '#666'
};

const paginationNumberStyle: React.CSSProperties = {
  width: '32px',
  height: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 4px',
  borderRadius: '4px',
  border: '1px solid #d9d9d9',
  cursor: 'pointer',
  fontSize: '14px'
};

export default MovementsPage;