import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

// Define types for our data
interface NodeDatum {
  id: string;
  group?: number;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface LinkDatum {
  source: string | NodeDatum;
  target: string | NodeDatum;
  localPort?: string;
  remotePort?: string;
}

interface TopologyData {
  nodes: NodeDatum[];
  links: LinkDatum[];
}

interface NetworkGraphProps {
  width: number;
  height: number;
  data: TopologyData;
}

function NetworkGraph({ width, height, data }: NetworkGraphProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    
    // 1. Select or create the SVG element
    const svg = d3.select(svgRef.current);
    
    // Clear previous render (if any), so we can redraw
    svg.selectAll('*').remove();
    
    const { nodes, links } = data;
    
    // Add group property to nodes based on their ID prefix
    nodes.forEach(node => {
      const switchNum = node.id.charAt(node.id.length - 1);
      // Group nodes by the last character of their ID
      if (switchNum <= 'G') {
        node.group = 1; // Blue group
      } else if (switchNum <= 'O') {
        node.group = 2; // Orange group
      } else {
        node.group = 3; // Light blue group
      }
    });
    
    // Define color scale based on group
    // Fix: Create color scale without type parameters
    const colorScale = d3.scaleOrdinal()
      .domain([1, 2, 3].map(String))
      .range(['#1f77b4', '#ff7f0e', '#aec7e8']);
    
    const getColor = (d: NodeDatum) => colorScale(String(d.group || 1));
    
    // 2. Create a force simulation with all forces needed
    const simulation = d3.forceSimulation<NodeDatum>(nodes)
      .force('link', d3.forceLink<NodeDatum, LinkDatum>(links).id(d => d.id).distance(60))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(20))
      .force('x', d3.forceX(width / 2).strength(0.05))
      .force('y', d3.forceY(height / 2).strength(0.05));
    
    // 3. Create <line> elements for links
    const link = svg
      .append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 1);
    
    // 4. Create <circle> elements for nodes
    // Fix: Create drag behavior with proper typing
    const drag = d3.drag<SVGCircleElement, NodeDatum>()
      .on('start', (event: d3.D3DragEvent<SVGCircleElement, NodeDatum, NodeDatum>, d: NodeDatum) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event: d3.D3DragEvent<SVGCircleElement, NodeDatum, NodeDatum>, d: NodeDatum) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event: d3.D3DragEvent<SVGCircleElement, NodeDatum, NodeDatum>, d: NodeDatum) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });
    
    // Create nodes with properly typed drag handler
    const node = svg
      .append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', 8)
      .attr('fill', getColor)
      .call(drag);
    
    // 5. Create <text> labels for nodes
    const label = svg
      .append('g')
      .attr('class', 'labels')
      .selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      .text(d => d.id.substring(7)) // Just show the label part after "Switch-"
      .attr('font-size', 10)
      .attr('dx', 12)
      .attr('dy', 4);
    
    // 6. Update positions on each tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as NodeDatum).x!)
        .attr('y1', d => (d.source as NodeDatum).y!)
        .attr('x2', d => (d.target as NodeDatum).x!)
        .attr('y2', d => (d.target as NodeDatum).y!);
      
      node
        .attr('cx', d => d.x!)
        .attr('cy', d => d.y!);
      
      label
        .attr('x', d => d.x!)
        .attr('y', d => d.y!);
    });
    
    // Initial heating of the simulation for better layout
    simulation.alpha(1).restart();
   
  }, [data, width, height]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      style={{ border: '1px solid #ccc' }}
    />
  );
}

export default NetworkGraph;