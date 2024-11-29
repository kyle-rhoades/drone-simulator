import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Move, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

const DroneSimulator = () => {
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [logs, setLogs] = useState([]);

  // More detailed obstacle definitions representing classroom desks
  const obstacles = [
    { x: 2, y: 2, width: 3, height: 2, type: 'desk' },
    { x: -5, y: 4, width: 3, height: 2, type: 'desk' },
    { x: 1, y: -3, width: 3, height: 2, type: 'desk' },
    { x: -2, y: -1, width: 3, height: 2, type: 'desk' },
    { x: 5, y: 5, width: 3, height: 2, type: 'desk' },
    { x: -4, y: -5, width: 3, height: 2, type: 'desk' }
  ];

  const addLog = (message) => {
    setLogs(prev => [message, ...prev].slice(0, 5));
  };

  const checkCollision = (newPos) => {
    return obstacles.some(obstacle => 
      newPos.x >= obstacle.x && 
      newPos.x < obstacle.x + obstacle.width &&
      newPos.y >= obstacle.y && 
      newPos.y < obstacle.y + obstacle.height
    );
  };

  const moveDrone = (dx, dy, dz) => {
    const newPosition = {
      x: position.x + dx,
      y: position.y + dy,
      z: position.z + dz
    };

    if (checkCollision(newPosition)) {
      addLog("Collision detected! Cannot move.");
      return;
    }

    setPosition(newPosition);
    addLog(`Moved to (${newPosition.x}, ${newPosition.y}, ${newPosition.z})`);
  };

  const resetDrone = () => {
    setPosition({ x: 0, y: 0, z: 0 });
    addLog("Drone reset to initial position");
  };

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle>Drone Classroom Navigation Simulator</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        {/* Drone Visualization and Course */}
        <div 
          className="w-full flex-grow flex justify-center items-center relative overflow-hidden mb-4" 
          style={{ height: '400px', border: '2px solid #e0e0e0' }}
        >
          {/* Background Grid */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'linear-gradient(to right, #f0f0f0 1px, transparent 1px), linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />

          {/* Drone SVG */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 400 400" 
            className="w-48 h-48 transition-transform duration-300 z-10"
            style={{
              transform: `translate(${200 + position.x * 40}px, ${200 - position.y * 40}px)`
            }}
          >
            <rect 
              x="175" 
              y="180" 
              width="50" 
              height="40" 
              fill="#333" 
              rx="5" 
            />
            
            <rect 
              x="160" 
              y="170" 
              width="80" 
              height="10" 
              fill="#555" 
            />
            <rect 
              x="160" 
              y="220" 
              width="80" 
              height="10" 
              fill="#555" 
            />
            
            <ellipse 
              cx="150" 
              cy="175" 
              rx="20" 
              ry="5" 
              fill="#999" 
            />
            <ellipse 
              cx="250" 
              cy="175" 
              rx="20" 
              ry="5" 
              fill="#999" 
            />
            <ellipse 
              cx="150" 
              cy="225" 
              rx="20" 
              ry="5" 
              fill="#999" 
            />
            <ellipse 
              cx="250" 
              cy="225" 
              rx="20" 
              ry="5" 
              fill="#999" 
            />

            <circle 
              cx="200" 
              cy="190" 
              r="5" 
              fill="#0077be" 
            />
          </svg>

          {/* Detailed Desk Obstacles */}
          {obstacles.map((obstacle, index) => (
            <div
              key={index}
              className="absolute bg-gray-200 border-4 border-gray-400 rounded-sm"
              style={{
                left: `${200 + obstacle.x * 40}px`,
                top: `${200 - obstacle.y * 40}px`,
                width: `${obstacle.width * 40}px`,
                height: `${obstacle.height * 40}px`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {/* Desk details */}
              <div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                           bg-gray-400 w-1/2 h-1/4"
                style={{ borderRadius: '4px' }}
              />
            </div>
          ))}
        </div>

        {/* Combined Control and Log Section */}
        <div className="flex flex-row gap-4">
          {/* Control Panel */}
          <div className="w-1/2 space-y-2">
            <div className="text-center">
              <p className="text-sm">Current Position: ({position.x}, {position.y}, {position.z})</p>
            </div>

            <div className="grid grid-cols-3 gap-1">
              <Button 
                size="sm"
                onClick={() => moveDrone(0, 1, 0)} 
                className="col-start-2"
              >
                <ArrowUp className="h-4 w-4" /> Up
              </Button>
              <Button 
                size="sm"
                onClick={() => moveDrone(0, -1, 0)} 
                className="col-start-2"
              >
                <ArrowDown className="h-4 w-4" /> Down
              </Button>
              <Button 
                size="sm"
                onClick={() => moveDrone(-1, 0, 0)} 
                className="col-start-1"
              >
                <ArrowLeft className="h-4 w-4" /> Left
              </Button>
              <Button 
                size="sm"
                onClick={() => moveDrone(1, 0, 0)} 
                className="col-start-3"
              >
                <ArrowRight className="h-4 w-4" /> Right
              </Button>
              <Button 
                size="sm"
                onClick={() => moveDrone(0, 0, 1)} 
                className="col-start-2"
              >
                <Move className="h-4 w-4" /> Forward
              </Button>
              <Button 
                size="sm"
                onClick={() => moveDrone(0, 0, -1)} 
                className="col-start-2"
              >
                <Move className="h-4 w-4 rotate-180" /> Backward
              </Button>
            </div>

            <div className="flex justify-center space-x-2">
              <Button variant="destructive" size="sm" onClick={resetDrone}>
                Reset Drone
              </Button>
            </div>
          </div>

          {/* Activity Log */}
          <div className="w-1/2 bg-gray-100 p-2 rounded">
            <h3 className="font-bold mb-2 text-sm">Activity Log</h3>
            <div className="h-40 overflow-y-auto">
              {logs.map((log, index) => (
                <p key={index} className="text-xs">
                  {log}
                </p>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DroneSimulator;
