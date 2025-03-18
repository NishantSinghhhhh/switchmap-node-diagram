import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NetworkGraph from './components/NetworkGraph';
import DeviceMovements from './components/DeviceMovements';
import AppHeader from './components/AppHeader';
import sampleData from './components/data';
import NetworkBandwidthDashboard from './components/BandwidthCHarting';
// Define the proper data type
interface TopologyData {
  nodes: Array<{
    id: string;
    group?: number;
  }>;
  links: Array<{
    source: string;
    target: string;
    localPort?: string;
    remotePort?: string;
  }>;
}

const App: React.FC = () => {
  return (
    <Router>
      <div className="App" style={{ 
        backgroundColor: '#f5f7fa',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <AppHeader />
        
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={
              <NetworkGraph 
                width={800} 
                height={600} 
                data={sampleData as TopologyData} 
              />
            } />
            <Route path="/movements" element={<DeviceMovements />} />
            <Route path="/NetworkBandwidthDashboard" element={<NetworkBandwidthDashboard />} />
          </Routes>
        </div>
        
        <footer style={{
          textAlign: 'center',
          padding: '20px',
          borderTop: '1px solid #eaeaea',
          backgroundColor: 'white',
          fontSize: '14px',
          color: '#999'
        }}>
          LLDP Network Manager © {new Date().getFullYear()}
        </footer>
      </div>
    </Router>
  );
};

export default App;