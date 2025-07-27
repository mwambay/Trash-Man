export interface Vehicle {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'maintenance';
  speed: number;
  fuelLevel: number;
  location: {
    lat: number;
    lng: number;
  };
  lastUpdate: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'driver';
  avatar: string;
}

export interface Alert {
  id: string;
  type: 'speed' | 'geofence' | 'maintenance';
  message: string;
  timestamp: string;
  vehicleId: string;
  status: 'new' | 'read';
}