import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { BarChart, Bar } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, RefreshCcw, Wifi, ArrowDown, ArrowUp } from 'lucide-react';

// Mock data - in a real implementation this would come from your GraphQL queries and subscriptions
const generateMockData = (count) => {
  const now = new Date();
  const data = [];
  for (let i = count; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000);
    data.push({
      timestamp: time.toLocaleTimeString(),
      inRate: Math.random() * 800 + 200,
      outRate: Math.random() * 500 + 100,
      packetLoss: Math.random() * 2,
      errors: Math.floor(Math.random() * 5),
      discards: Math.floor(Math.random() * 3),
      utilization: Math.random() * 60 + 20
    });
  }
  return data;
};

const formatBandwidth = (value) => {
  if (value < 1000) {
    return `${value.toFixed(1)} Mbps`;
  } else {
    return `${(value / 1000).toFixed(2)} Gbps`;
  }
};

const NetworkBandwidthDashboard = () => {
  const [timeRange, setTimeRange] = useState('1h');
  const [selectedDevice, setSelectedDevice] = useState('router1');
  const [selectedInterface, setSelectedInterface] = useState('GigabitEthernet0/1');
  const [bandwidthData, setBandwidthData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  
  // Simulating devices and interfaces - would come from your backend in reality
  const devices = [
    { id: 'router1', name: 'Core Router' },
    { id: 'switch1', name: 'Distribution Switch' },
    { id: 'switch2', name: 'Access Switch' }
  ];
  
  const interfaces = [
    { id: 'GigabitEthernet0/1', name: 'GigabitEthernet0/1 (Uplink)' },
    { id: 'GigabitEthernet0/2', name: 'GigabitEthernet0/2 (Server VLAN)' },
    { id: 'GigabitEthernet0/3', name: 'GigabitEthernet0/3 (User VLAN)' }
  ];

  // Calculate summary metrics
  const calculateSummary = (data) => {
    if (!data || data.length === 0) return {};
    
    const inRates = data.map(d => d.inRate);
    const outRates = data.map(d => d.outRate);
    
    return {
      currentIn: inRates[inRates.length - 1],
      currentOut: outRates[outRates.length - 1],
      peakIn: Math.max(...inRates),
      peakOut: Math.max(...outRates),
      avgIn: inRates.reduce((sum, val) => sum + val, 0) / inRates.length,
      avgOut: outRates.reduce((sum, val) => sum + val, 0) / outRates.length
    };
  };

  const summary = calculateSummary(bandwidthData);

  // Simulate fetching data
  const fetchData = () => {
    setRefreshing(true);
    
    // Determine how many data points to generate based on time range
    let dataPoints = 60; // Default to 1 hour (60 minutes)
    if (timeRange === '3h') dataPoints = 180;
    if (timeRange === '24h') dataPoints = 1440;
    if (timeRange === '7d') dataPoints = 10080;
    
    // In a real app, this would be a GraphQL query to your backend
    setTimeout(() => {
      setBandwidthData(generateMockData(dataPoints));
      setRefreshing(false);
    }, 500);
  };
  
  // Initial data load
  useEffect(() => {
    fetchData();
    
    // Setup subscription for real-time updates (simulated here)
    const interval = setInterval(() => {
      // In a real app, you'd use a GraphQL subscription instead
      const lastData = [...bandwidthData];
      if (lastData.length > 0) {
        const newPoint = {
          timestamp: new Date().toLocaleTimeString(),
          inRate: Math.random() * 800 + 200,
          outRate: Math.random() * 500 + 100,
          packetLoss: Math.random() * 2,
          errors: Math.floor(Math.random() * 5),
          discards: Math.floor(Math.random() * 3),
          utilization: Math.random() * 60 + 20
        };
        lastData.push(newPoint);
        if (lastData.length > 60) lastData.shift();
        setBandwidthData(lastData);
      }
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [timeRange, selectedDevice, selectedInterface]);

  // Get last 10 points for the recent activity view
  const recentData = bandwidthData.slice(-10);

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header with controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Network Bandwidth Monitoring</h1>
          <p className="text-gray-500">Real-time and historical bandwidth metrics</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select value={selectedDevice} onValueChange={setSelectedDevice}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select Device" />
            </SelectTrigger>
            <SelectContent>
              {devices.map(device => (
                <SelectItem key={device.id} value={device.id}>{device.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedInterface} onValueChange={setSelectedInterface}>
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Select Interface" />
            </SelectTrigger>
            <SelectContent>
              {interfaces.map(iface => (
                <SelectItem key={iface.id} value={iface.id}>{iface.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="3h">Last 3 Hours</SelectItem>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
            </SelectContent>
          </Select>
          
          <button 
            className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={fetchData}
            disabled={refreshing}
          >
            <RefreshCcw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Current Bandwidth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-1">
                  <ArrowDown className="h-4 w-4 text-green-500" />
                  <span className="text-xl font-bold">{formatBandwidth(summary.currentIn || 0)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ArrowUp className="h-4 w-4 text-blue-500" />
                  <span className="text-xl font-bold">{formatBandwidth(summary.currentOut || 0)}</span>
                </div>
              </div>
              <div className="h-16 w-20">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={recentData.slice(-2)}>
                    <Bar dataKey="inRate" fill="#10b981" />
                    <Bar dataKey="outRate" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Peak Bandwidth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-1">
                  <ArrowDown className="h-4 w-4 text-green-500" />
                  <span className="text-xl font-bold">{formatBandwidth(summary.peakIn || 0)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ArrowUp className="h-4 w-4 text-blue-500" />
                  <span className="text-xl font-bold">{formatBandwidth(summary.peakOut || 0)}</span>
                </div>
              </div>
              <div className="flex items-center justify-center bg-gray-100 h-16 w-16 rounded-full">
                <Wifi className="h-8 w-8 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Average Bandwidth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-1">
                  <ArrowDown className="h-4 w-4 text-green-500" />
                  <span className="text-xl font-bold">{formatBandwidth(summary.avgIn || 0)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ArrowUp className="h-4 w-4 text-blue-500" />
                  <span className="text-xl font-bold">{formatBandwidth(summary.avgOut || 0)}</span>
                </div>
              </div>
              <div className="h-16 w-20">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={recentData}>
                    <Line type="monotone" dataKey="inRate" stroke="#10b981" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="outRate" stroke="#3b82f6" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main content tabs */}
      <Tabs defaultValue="bandwidth" className="w-full">
        <TabsList>
          <TabsTrigger value="bandwidth">Bandwidth Utilization</TabsTrigger>
          <TabsTrigger value="errors">Errors & Packet Loss</TabsTrigger>
          <TabsTrigger value="utilization">Interface Utilization</TabsTrigger>
        </TabsList>
        
        <TabsContent value="bandwidth">
          <Card>
            <CardHeader>
              <CardTitle>Interface Bandwidth Usage</CardTitle>
              <CardDescription>
                Inbound and outbound bandwidth metrics for {selectedInterface} on {devices.find(d => d.id === selectedDevice)?.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={bandwidthData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="timestamp" 
                      label={{ value: 'Time', position: 'insideBottomRight', offset: -10 }}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      label={{ value: 'Bandwidth (Mbps)', angle: -90, position: 'insideLeft' }}
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => value >= 1000 ? `${(value/1000).toFixed(1)}G` : `${value.toFixed(0)}M`}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value.toFixed(2)} Mbps`, '']}
                      labelFormatter={(label) => `Time: ${label}`}
                    />
                    <Legend verticalAlign="top" height={36} />
                    <Line 
                      name="Inbound Traffic" 
                      type="monotone" 
                      dataKey="inRate" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 5 }}
                    />
                    <Line 
                      name="Outbound Traffic" 
                      type="monotone" 
                      dataKey="outRate" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="errors">
          <Card>
            <CardHeader>
              <CardTitle>Interface Errors & Packet Loss</CardTitle>
              <CardDescription>
                Error metrics and packet loss statistics for {selectedInterface}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={bandwidthData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis yAxisId="left" orientation="left" stroke="#ef4444" />
                    <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />
                    <Line 
                      yAxisId="left"
                      name="Errors" 
                      type="monotone" 
                      dataKey="errors" 
                      stroke="#ef4444" 
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line 
                      yAxisId="left"
                      name="Discards" 
                      type="monotone" 
                      dataKey="discards" 
                      stroke="#8b5cf6" 
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line 
                      yAxisId="right"
                      name="Packet Loss %" 
                      type="monotone" 
                      dataKey="packetLoss" 
                      stroke="#f59e0b" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="utilization">
          <Card>
            <CardHeader>
              <CardTitle>Interface Utilization</CardTitle>
              <CardDescription>
                Percentage utilization of {selectedInterface} capacity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={bandwidthData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis 
                      domain={[0, 100]}
                      tickFormatter={(value) => `${value}%`}
                      label={{ value: 'Utilization (%)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip formatter={(value) => [`${value.toFixed(1)}%`, 'Utilization']} />
                    <Legend verticalAlign="top" height={36} />
                    <Line 
                      name="Interface Utilization" 
                      type="monotone" 
                      dataKey="utilization" 
                      stroke="#0ea5e9" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Alert for potential issues - can be dynamically shown based on data */}
      {bandwidthData.length > 0 && bandwidthData[bandwidthData.length - 1].utilization > 80 && (
        <Card className="bg-red-50 border-red-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-red-900">High Utilization Alert</h3>
                <p className="text-red-700">
                  Interface {selectedInterface} is experiencing high utilization ({bandwidthData[bandwidthData.length - 1].utilization.toFixed(1)}%). 
                  Consider investigating potential bottlenecks.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NetworkBandwidthDashboard;