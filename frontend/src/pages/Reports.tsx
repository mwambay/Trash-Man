import React from 'react';
import { FileText, Download, Calendar, Filter } from 'lucide-react';

const Reports = () => {
  const reports = [
    {
      id: 1,
      name: 'Rapport de Collecte',
      description: 'Analyse détaillée des performances de collecte des déchets',
      date: 'Generated today',
      type: 'collecte',
    },
    {
      id: 2,
      name: 'Analyse de Remplissage',
      description: 'Statistiques mensuelles du taux de remplissage des poubelles',
      date: 'Generated yesterday',
      type: 'remplissage',
    },
    {
      id: 3,
      name: 'Optimisation des Tournées',
      description: 'Analyse de l\'efficacité des tournées et recommandations',
      date: 'Generated 3 days ago',
      type: 'tournees',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Rapports</h1>
        
        <div className="flex space-x-4">
          <button className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Calendar className="mr-2 h-5 w-5" />
            Période
          </button>
          <button className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Filter className="mr-2 h-5 w-5" />
            Filtrer
          </button>
          <button className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
            <FileText className="mr-2 h-5 w-5" />
            Générer Rapport
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <div
            key={report.id}
            className="relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{report.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{report.description}</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{report.date}</span>
                <button className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-500">
                  <Download className="mr-1 h-4 w-4" />
                  Télécharger
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tableau des rapports récents */}
      <div className="rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900">Rapports Récents</h3>
          <div className="mt-4 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                        Nom du Rapport
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Date de Génération
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Type
                      </th>
                      <th className="relative py-3.5 pl-3 pr-4">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {reports.map((report) => (
                      <tr key={report.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                          {report.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {report.date}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {report.type}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                          <button className="text-green-600 hover:text-green-900">
                            Télécharger
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;