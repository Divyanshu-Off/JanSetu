import React, { useEffect, useState } from "react";

interface Issue {
  id: string;
  title: string;
  description: string;
  status: "Pending" | "In Progress" | "Resolved";
  priority: "High" | "Medium" | "Low";
  date: string;
}

interface DepartmentViewProps {
  department: { id: number; name: string };
  onBack?: () => void;
}

export default function DepartmentView({ department, onBack }: DepartmentViewProps) {
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    fetch(`/api/departments/${department.id}/issues`)
      .then(res => res.json())
      .then(setIssues);
  }, [department.id]);

  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 py-6">
      {onBack && (
        <button onClick={onBack} className="mb-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          &larr; Back
        </button>
      )}
      <h1 className="text-2xl font-bold text-blue-700 mb-1">{department.name}</h1>
      <p className="mb-4 text-gray-600">View and manage all issues for this department</p>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <select className="p-2 border rounded w-full sm:w-auto">
          <option>All Status</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>
        <select className="p-2 border rounded w-full sm:w-auto">
          <option>All Priority</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>
      <div className="space-y-4">
        {issues.map(issue => (
          <div key={issue.id} className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex gap-2 mb-1">
                <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
                  issue.status === "Resolved"
                    ? "bg-green-100 text-green-700"
                    : issue.status === "Pending"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}>
                  {issue.status}
                </span>
                <span className={`px-2 py-1 text-xs rounded-full font-semibold border ${
                  issue.priority === "High"
                    ? "border-red-400 text-red-600"
                    : issue.priority === "Medium"
                    ? "border-yellow-400 text-yellow-700"
                    : "border-green-400 text-green-700"
                }`}>
                  {issue.priority} Priority
                </span>
              </div>
              <h3 className="text-lg font-semibold">{issue.title}</h3>
              <p className="text-gray-600 mb-1">{issue.description}</p>
              <p className="text-xs text-gray-500">Reported on: {new Date(issue.date).toLocaleDateString()}</p>
            </div>
            <button className="mt-3 md:mt-0 md:ml-8 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded hover:bg-blue-200">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
