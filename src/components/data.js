// data.js
const sampleData = {
    nodes: [
      { id: 'Switch-A' },
      { id: 'Switch-B' },
      { id: 'Switch-C' },
      { id: 'Switch-D' },
      { id: 'Switch-E' },
      { id: 'Switch-F' },
      { id: 'Switch-G' },
      { id: 'Switch-H' },
      { id: 'Switch-I' },
      { id: 'Switch-J' },
      { id: 'Switch-K' },
      { id: 'Switch-L' },
      { id: 'Switch-M' },
      { id: 'Switch-N' },
      { id: 'Switch-O' },
      { id: 'Switch-P' },
      { id: 'Switch-Q' },
      { id: 'Switch-R' },
      { id: 'Switch-S' },
      { id: 'Switch-T' }
    ],
    links: [
      // Original ring topology
      { source: 'Switch-A', target: 'Switch-B', localPort: '1', remotePort: '5' },
      { source: 'Switch-B', target: 'Switch-C', localPort: '2', remotePort: '6' },
      { source: 'Switch-C', target: 'Switch-D', localPort: '3', remotePort: '7' },
      { source: 'Switch-D', target: 'Switch-E', localPort: '4', remotePort: '8' },
      { source: 'Switch-E', target: 'Switch-F', localPort: '1', remotePort: '5' },
      { source: 'Switch-F', target: 'Switch-G', localPort: '2', remotePort: '6' },
      { source: 'Switch-G', target: 'Switch-H', localPort: '3', remotePort: '7' },
      { source: 'Switch-H', target: 'Switch-I', localPort: '4', remotePort: '8' },
      { source: 'Switch-I', target: 'Switch-J', localPort: '1', remotePort: '5' },
      { source: 'Switch-J', target: 'Switch-K', localPort: '2', remotePort: '6' },
      { source: 'Switch-K', target: 'Switch-L', localPort: '3', remotePort: '7' },
      { source: 'Switch-L', target: 'Switch-M', localPort: '4', remotePort: '8' },
      { source: 'Switch-M', target: 'Switch-N', localPort: '1', remotePort: '5' },
      { source: 'Switch-N', target: 'Switch-O', localPort: '2', remotePort: '6' },
      { source: 'Switch-O', target: 'Switch-P', localPort: '3', remotePort: '7' },
      { source: 'Switch-P', target: 'Switch-Q', localPort: '4', remotePort: '8' },
      { source: 'Switch-Q', target: 'Switch-R', localPort: '1', remotePort: '5' },
      { source: 'Switch-R', target: 'Switch-S', localPort: '2', remotePort: '6' },
      { source: 'Switch-S', target: 'Switch-T', localPort: '3', remotePort: '7' },
      { source: 'Switch-T', target: 'Switch-A', localPort: '4', remotePort: '8' },
  
      // Additional connections for the blue group (A-G)
      { source: 'Switch-A', target: 'Switch-C', localPort: '9', remotePort: '10' },
      { source: 'Switch-A', target: 'Switch-D', localPort: '11', remotePort: '12' },
      { source: 'Switch-B', target: 'Switch-D', localPort: '13', remotePort: '14' },
      { source: 'Switch-B', target: 'Switch-E', localPort: '15', remotePort: '16' },
      { source: 'Switch-C', target: 'Switch-F', localPort: '17', remotePort: '18' },
      { source: 'Switch-D', target: 'Switch-G', localPort: '19', remotePort: '20' },
      { source: 'Switch-E', target: 'Switch-G', localPort: '21', remotePort: '22' },
  
      // Additional connections for the orange group (H-O)
      { source: 'Switch-H', target: 'Switch-J', localPort: '23', remotePort: '24' },
      { source: 'Switch-H', target: 'Switch-K', localPort: '25', remotePort: '26' },
      { source: 'Switch-I', target: 'Switch-L', localPort: '27', remotePort: '28' },
      { source: 'Switch-J', target: 'Switch-M', localPort: '29', remotePort: '30' },
      { source: 'Switch-K', target: 'Switch-N', localPort: '31', remotePort: '32' },
      { source: 'Switch-L', target: 'Switch-O', localPort: '33', remotePort: '34' },
      { source: 'Switch-M', target: 'Switch-O', localPort: '35', remotePort: '36' },
  
      // Additional connections for the light blue group (P-T)
      { source: 'Switch-P', target: 'Switch-R', localPort: '37', remotePort: '38' },
      { source: 'Switch-P', target: 'Switch-S', localPort: '39', remotePort: '40' },
      { source: 'Switch-Q', target: 'Switch-S', localPort: '41', remotePort: '42' },
      { source: 'Switch-Q', target: 'Switch-T', localPort: '43', remotePort: '44' },
      { source: 'Switch-R', target: 'Switch-T', localPort: '45', remotePort: '46' },
  
      // Inter-group connections
      { source: 'Switch-G', target: 'Switch-H', localPort: '47', remotePort: '48' },
      { source: 'Switch-A', target: 'Switch-T', localPort: '49', remotePort: '50' },
      { source: 'Switch-E', target: 'Switch-J', localPort: '51', remotePort: '52' },
      { source: 'Switch-D', target: 'Switch-M', localPort: '53', remotePort: '54' },
      { source: 'Switch-F', target: 'Switch-P', localPort: '55', remotePort: '56' },
      { source: 'Switch-N', target: 'Switch-Q', localPort: '57', remotePort: '58' },
      { source: 'Switch-O', target: 'Switch-R', localPort: '59', remotePort: '60' }
    ]
  };
  
  export default sampleData;