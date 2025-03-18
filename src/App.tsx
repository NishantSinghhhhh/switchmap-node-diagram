import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NetworkGraph from './components/NetworkGraph';
import sampleData from './components/data';
import DeviceMovements from './components/DeviceMovements';

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
      <div className="App">
        <header className="App-header">
          <h1>LLDP Network Topology</h1>
          {/* Navigation Links */}
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/movements">Device Movements</Link></li>
            </ul>
          </nav>
        </header>

        {/* Routes */}
        <Routes>
          <Route path="/" element={
            <NetworkGraph 
              width={800} 
              height={600} 
              data={sampleData as TopologyData} 
            />
          } />
          <Route path="/movements" element={<DeviceMovements />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;