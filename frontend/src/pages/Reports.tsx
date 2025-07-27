import React from 'react';
import { FileText, Download, Calendar, Filter } from 'lucide-react';

const Reports = () => {
  const reports = [
    {
      id: 1,
      name: 'Vehicle Performance Report',
      description: 'Detailed analysis of vehicle performance metrics',
      date: 'Generated today',
      type: 'performance',
    },
    {
      id: 2,
      name: 'Fuel Consumption Analysis',
      description: 'Monthly fuel usage and efficiency metrics',
      date: 'Generated yesterday',
      type: 'fuel',
    },
    {
      id: 3,
      name: 'Route Optimization Report',
      description: 'Analysis of route efficiency and recommendations',
      date: 'Generated 3 days ago',
      type: 'route',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
        
        <div className="flex space-x-4">
          <button className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Calendar className="mr-2 h-5 w-5" />
            Date Range
          </button>
          <button className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Filter className="mr-2 h-5 w-5" />
            Filter
          </button>
          <button className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            <FileText className="mr-2 h-5 w-5" />
            Generate Report
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
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{report.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{report.description}</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{report.date}</span>
                <button className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500">
                  <Download className="mr-1 h-4 w-4" />
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Reports Table */}
      <div className="rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900">Recent Reports</h3>
          <div className="mt-4 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                        Report Name
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Generated Date
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
                          <button className="text-blue-600 hover:text-blue-900">
                            Download
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