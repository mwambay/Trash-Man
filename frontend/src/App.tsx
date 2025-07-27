import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import VehicleTracking from './pages/VehicleTracking';
import Alerts from './pages/Alerts';
import VehicleList from './pages/ListVehicle';
import Reports from './pages/Reports';
import UserManagement from './pages/UserManagement';
import ListChauffeur  from './pages/ListChauffeurs';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="tracking" element={<VehicleTracking />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="reports" element={<Reports />} />
          <Route path="users" element={<UserManagement />} />
          <Route path='list' element={<VehicleList/>}/>
          <Route path='listChauff' element={<ListChauffeur/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;