import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Trash2, LayoutDashboard, Bell, FileBarChart, Users, Menu, X, MapPin, User2} from 'lucide-react';
import { useState } from 'react';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    {name: "Liste des Poubelles", href: '/list', icon: Trash2},
    {name: 'Liste des Collecteurs', href: '/listCollector', icon: User2 },
    { name: 'Carte des Poubelles', href: '/tracking', icon: MapPin },
    { name: 'Alertes', href: '/alerts', icon: Bell },
    { name: 'Rapports', href: '/reports', icon: FileBarChart },
    { name: 'Gestion utilisateurs', href: '/users', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <button
        className="fixed top-4 right-4 z-50 lg:hidden bg-white p-2 rounded-lg shadow-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white shadow-lg transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-center border-b">
          <img src="/icons/logo.png" alt="Okapie Technologie Logo" className="h-92 w-12" />
          <span className="ml-2 text-xl font-bold text-green-700">EcoTrack</span>
        </div>

        <nav className="mt-6 px-3">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`mt-2 flex items-center rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                  location.pathname === item.href
                    ? 'bg-green-50 text-green-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className={`lg:pl-64 min-h-screen transition-all duration-200`}>
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;