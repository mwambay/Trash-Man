import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import TrashTracking from './pages/TrashTracking';
import Alerts from './pages/Alerts';
import TrashList from './pages/ListTrash';
import Reports from './pages/Reports';
import UserManagement from './pages/UserManagement';
import ListCollector from './pages/ListCollectors';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="tracking" element={<TrashTracking />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="reports" element={<Reports />} />
          <Route path="users" element={<UserManagement />} />
          <Route path='list' element={<TrashList/>}/>
          <Route path='listCollector' element={<ListCollector/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;