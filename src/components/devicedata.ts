// src/data/movementsData.ts
export interface Movement {
    id: number;
    deviceName: string;
    deviceType: string;
    fromSwitch: string;
    fromPort: string;
    toSwitch: string;
    toPort: string;
    timestamp: string;
  }
  
  // Generate a larger dataset for demonstration
  const generateMovementsData = (): Movement[] => {
    const devices = [
      { name: "Laptop 1", type: "Workstation" },
      { name: "MacBook Pro", type: "Workstation" },
      { name: "Dell XPS", type: "Workstation" },
      { name: "HP Printer", type: "Peripheral" },
      { name: "iPhone 15", type: "Mobile" },
      { name: "Samsung Galaxy", type: "Mobile" },
      { name: "Server 001", type: "Server" },
      { name: "Server 002", type: "Server" },
      { name: "Raspberry Pi", type: "IoT Device" },
      { name: "IP Camera", type: "Security" },
      { name: "WiFi AP", type: "Network" },
      { name: "VOIP Phone", type: "Communication" }
    ];
    
    const switches = ["Switch-A", "Switch-B", "Switch-C", "Switch-D", "Switch-E", "Switch-F", "Switch-G", "Switch-H"];
    
    const data: Movement[] = [];
    
    // Generate 50 sample movements
    for (let i = 1; i <= 50; i++) {
      const device = devices[Math.floor(Math.random() * devices.length)];
      const fromSwitch = switches[Math.floor(Math.random() * switches.length)];
      let toSwitch = switches[Math.floor(Math.random() * switches.length)];
      
      // Make sure toSwitch is different from fromSwitch
      while (toSwitch === fromSwitch) {
        toSwitch = switches[Math.floor(Math.random() * switches.length)];
      }
      
      const fromPort = Math.floor(Math.random() * 24) + 1;
      const toPort = Math.floor(Math.random() * 24) + 1;
      
      // Generate random timestamp in the last month
      const now = new Date();
      const pastDate = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000);
      const timestamp = pastDate.toISOString().replace('T', ' ').substring(0, 19);
      
      data.push({
        id: i,
        deviceName: device.name,
        deviceType: device.type,
        fromSwitch,
        fromPort: fromPort.toString(),
        toSwitch,
        toPort: toPort.toString(),
        timestamp
      });
    }
    
    // Sort by timestamp (newest first)
    return data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  };
  
  const movementsData: Movement[] = generateMovementsData();
  
  export default movementsData;