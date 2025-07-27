import React from 'react';
import { Activity, Battery, MapPin, AlertTriangle, Car } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { name: 'Active Vehicles', value: '24/30', icon: Activity, color: 'text-green-600' },
    { name: 'Average Speed', value: '65 km/h', icon: Battery, color: 'text-blue-600' },
    { name: 'Total Distance', value: '1,543 km', icon: MapPin, color: 'text-purple-600' },
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
            <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Activity</h3>
            <div className="mt-4 flow-root">
              <ul className="-mb-8">
                {[1, 2, 3].map((item) => (
                  <li key={item} className="relative pb-8">
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                          <Car className="h-5 w-5 text-white" />
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm text-gray-500">
                            Vehicle ABC-123 entered geofence Zone A
                          </p>
                        </div>
                        <div className="whitespace-nowrap text-right text-sm text-gray-500">
                          3m ago
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Vehicle Status */}
        <div className="rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Vehicle Status</h3>
            <div className="mt-4">
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Car className="h-5 w-5 text-gray-400" />
                      <span className="ml-2 text-sm font-medium text-gray-900">
                        Vehicle {item}
                      </span>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Active
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