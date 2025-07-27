import React from 'react';
import { Activity, Recycle, MapPin, AlertTriangle, Trash2 } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { name: 'Poubelles Actives', value: '87/100', icon: Activity, color: 'text-green-600' },
    { name: 'Taux de Remplissage', value: '68%', icon: Recycle, color: 'text-blue-600' },
    { name: 'Zones Couvertes', value: '12', icon: MapPin, color: 'text-purple-600' },
    { name: 'Active Alerts', value: '3', icon: AlertTriangle, color: 'text-red-600' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6"
            >
              <dt>
                <div className={`absolute rounded-md p-3 ${stat.color} bg-opacity-10`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">
                  {stat.name}
                </p>
              </dt>
              <dd className="ml-16 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </dd>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Activité Récente</h3>
            <div className="mt-4 flow-root">
              <ul className="-mb-8">
                {[1, 2, 3].map((item) => (
                  <li key={item} className="relative pb-8">
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                          <Trash2 className="h-5 w-5 text-white" />
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm text-gray-500">
                            Poubelle PB-{item.toString().padStart(3, '0')} - Niveau de remplissage: {70 + item * 5}%
                          </p>
                        </div>
                        <div className="whitespace-nowrap text-right text-sm text-gray-500">
                          {item * 5}m ago
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Trash Status */}
        <div className="rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">État des Poubelles</h3>
            <div className="mt-4">
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Trash2 className="h-5 w-5 text-gray-400" />
                      <span className="ml-2 text-sm font-medium text-gray-900">
                        Poubelle PB-{item.toString().padStart(3, '0')}
                      </span>
                    </div>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      item === 1 ? 'bg-red-100 text-red-800' : 
                      item === 2 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-green-100 text-green-800'
                    }`}>
                      {item === 1 ? 'Pleine' : item === 2 ? 'Mi-pleine' : 'Vide'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;