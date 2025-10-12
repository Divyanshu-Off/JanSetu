import React, { useEffect, useState } from 'react';

interface Department {
  id: number;
  name: string;
}

export default function Sidebar({ selectedDept, onSelect }: { selectedDept: Department | null, onSelect: (dept: Department) => void }) {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch('/api/departments')
      .then(res => res.json())
      .then(data => setDepartments(data));
  }, []);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded"
        onClick={() => setOpen(true)}
      >
        ☰
      </button>
      {/* Overlay for mobile */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 ${open ? '' : 'hidden md:hidden'}`} onClick={() => setOpen(false)} />
      {/* Sidebar panel */}
      <aside className={`fixed md:static md:block top-0 left-0 z-50 h-full w-64 bg-gray-100 flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="font-bold text-lg bg-blue-600 text-white py-4 px-6">Departments</div>
        <nav className="flex-1 py-6">
          {departments.map((dept) => (
            <button
              key={dept.id}
              className={`block w-full py-2 px-4 text-left ${selectedDept?.id === dept.id ? "bg-blue-200 font-semibold" : ""}`}
              onClick={() => { onSelect(dept); setOpen(false); }}
            >
              {dept.name}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}
