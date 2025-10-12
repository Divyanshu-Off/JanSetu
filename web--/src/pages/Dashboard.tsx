import React from "react";

export default function Dashboard() {
  const stats = [
    { label: 'Total Issues', value: '1,234', color: 'bg-blue-600' },
    { label: 'Resolved', value: '856', color: 'bg-green-600' },
    { label: 'In Progress', value: '267', color: 'bg-yellow-600' },
    { label: 'Pending', value: '111', color: 'bg-red-600' },
  ];

  const recentIssues = [
    { id: 'ISS-001', title: 'Street light not working', dept: 'Electricity', status: 'In Progress' },
    { id: 'ISS-002', title: 'Garbage collection delayed', dept: 'Sanitation', status: 'Pending' },
    { id: 'ISS-003', title: 'Pothole on Main Road', dept: 'PWD', status: 'Resolved' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 py-6">
      {/* Panel */}
      <div className="rounded-lg bg-white p-6 mb-6 shadow">
        <h1 className="text-3xl font-bold mb-1">Jan Setu Portal</h1>
        <p className="text-gray-600 mb-4">Citizen Services & Complaint Management System</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {stats.map(stat => (
            <div key={stat.label} className="flex flex-col items-center p-4 rounded-lg shadow bg-gray-100 w-full">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <span className="text-gray-600 text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Issues Table */}
      <div className="bg-white rounded-lg p-4 shadow mb-6 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-2">Recent Issues</h2>
        <table className="min-w-[600px] w-full text-left text-sm">
          <thead>
            <tr className="border-b font-semibold">
              <th className="py-2 px-3">Issue ID</th>
              <th className="py-2 px-3">Title</th>
              <th className="py-2 px-3">Department</th>
              <th className="py-2 px-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentIssues.map(issue => (
              <tr key={issue.id} className="border-b last:border-b-0">
                <td className="py-2 px-3 font-mono">{issue.id}</td>
                <td className="py-2 px-3">{issue.title}</td>
                <td className="py-2 px-3">{issue.dept}</td>
                <td className="py-2 px-3">
                  <span className={
                    issue.status === 'Resolved'
                      ? "bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs"
                      : issue.status === 'Pending'
                      ? "bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs"
                      : "bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs"
                  }>
                    {issue.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-6 shadow flex flex-col items-center">
          <div className="bg-blue-100 text-blue-700 rounded-full w-12 h-12 flex items-center justify-center text-2xl mb-2">+</div>
          <p className="font-medium mb-1">File New Complaint</p>
          <p className="text-gray-500 text-sm text-center">Submit a new civic issue or complaint</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow flex flex-col items-center">
          <div className="bg-green-100 text-green-700 rounded-full w-12 h-12 flex items-center justify-center text-2xl mb-2">&#10003;</div>
          <p className="font-medium mb-1">Track Complaint</p>
          <p className="text-gray-500 text-sm text-center">Check status of your submitted issues</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow flex flex-col items-center">
          <div className="bg-purple-100 text-purple-700 rounded-full w-12 h-12 flex items-center justify-center text-2xl mb-2">&#128201;</div>
          <p className="font-medium mb-1">View Reports</p>
          <p className="text-gray-500 text-sm text-center">Access detailed analytics and reports</p>
        </div>
      </div>
    </div>
  );
}
