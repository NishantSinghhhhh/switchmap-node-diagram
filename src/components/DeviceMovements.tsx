// src/pages/MovementsPage.tsx
import React from 'react';

interface Movement {
  id: number;
  deviceName: string;
  fromSwitch: string;
  fromPort: string;
  toSwitch: string;
  toPort: string;
  timestamp: string;
}

const MovementsPage: React.FC = () => {
  // Hard-coded movement data for demonstration purposes
  const movementsData: Movement[] = [
    {
      id: 1,
      deviceName: "Laptop 1",
      fromSwitch: "Switch-A",
      fromPort: "1",
      toSwitch: "Switch-B",
      toPort: "2",
      timestamp: "2023-03-18 10:00:00",
    },
    {
      id: 2,
      deviceName: "Printer ABC",
      fromSwitch: "Switch-C",
      fromPort: "3",
      toSwitch: "Switch-D",
      toPort: "4",
      timestamp: "2023-03-18 10:05:00",
    },
    {
      id: 3,
      deviceName: "Server 001",
      fromSwitch: "Switch-E",
      fromPort: "5",
      toSwitch: "Switch-F",
      toPort: "6",
      timestamp: "2023-03-18 10:10:00",
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Device Movement History</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }} border={1}>
        <thead>
          <tr>
            <th>Device Name</th>
            <th>From (Switch:Port)</th>
            <th>To (Switch:Port)</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {movementsData.map((movement) => (
            <tr key={movement.id}>
              <td>{movement.deviceName}</td>
              <td>{movement.fromSwitch}:{movement.fromPort}</td>
              <td>{movement.toSwitch}:{movement.toPort}</td>
              <td>{movement.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovementsPage;
