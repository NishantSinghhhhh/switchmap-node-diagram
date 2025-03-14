// App.jsx
import React from 'react';
import NetworkGraph from './components/NetworkGraph';
import sampleData from './components/data';

function App() {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>LLDP Network Topology</h1>
      <NetworkGraph
        width={800}
        height={600}
        data={sampleData}
      />
    </div>
  );
}

export default App;
