import React from 'react';
import { Bell, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';

const Alerts = () => {
  const alerts = [
    {
      id: 1,
      type: 'full',
      message: 'Poubelle PB-045 est pleine (95% de capacité)',
      timestamp: '5 minutes ago',
      severity: 'high',
    },
    {
      id: 2,
      type: 'maintenance',
      message: 'Poubelle PB-123 nécessite une maintenance',
      timestamp: '15 minutes ago',
      severity: 'medium',
    },
    {
      id: 3,
      type: 'collection',
      message: 'Zone Secteur 7 programmée pour collecte demain',
      timestamp: '1 hour ago',
      severity: 'low',
    },
  ];

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'medium':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'low':
        return <Bell className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Alertes</h1>
        
        <div className="flex space-x-4">
          <button className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
            <CheckCircle className="mr-2 h-5 w-5" />
            Marquer comme lues
          </button>
        </div>
      </div>

      <div className="rounded-lg bg-white shadow">
        <div className="p-6">
          <div className="flow-root">
            <ul className="-mb-8">
              {alerts.map((alert, alertIdx) => (
                <li key={alert.id}>
                  <div className="relative pb-8">
                    {alertIdx !== alerts.length - 1 ? (
                      <span
                        className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>{getSeverityIcon(alert.severity)}</div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-900">
                            {alert.message}
                          </h3>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getSeverityClass(
                              alert.severity
                            )}`}
                          >
                            {alert.severity}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">{alert.timestamp}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;