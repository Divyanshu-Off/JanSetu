import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import DepartmentView from '../pages/DepartmentView';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [selectedDept, setSelectedDept] = useState<{ id: number; name: string } | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const resp = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (resp.ok) {
      const { token } = await resp.json();
      localStorage.setItem('authToken', token);
      setLoggedIn(true);
      setShowLogin(false);
    } else {
      alert("Login failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 md:pl-64">
      <Sidebar selectedDept={selectedDept} onSelect={setSelectedDept} />
      <main className="flex flex-col min-h-screen">
        <header className="flex items-center gap-2 bg-white px-6 py-2 shadow sticky top-0 z-30">
          <button className="px-3 py-2 text-sm font-medium rounded bg-gray-200">
            <span className="hidden sm:inline">Notifications</span>
            <span className="sm:hidden">🔔</span>
          </button>
          {loggedIn ? (
            <span className="ml-auto px-4 py-2 text-green-600 font-bold">Logged in!</span>
          ) : (
            <button className="px-4 py-2 text-sm font-medium rounded bg-gray-200" onClick={() => setShowLogin(true)}>Login</button>
          )}
        </header>
        {showLogin && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center z-50">
            <form className="bg-white p-6 rounded shadow w-full max-w-xs" onSubmit={handleLogin}>
              <h2 className="font-bold mb-2">Login</h2>
              <input type="text" placeholder="Username" className="mb-2 p-2 border w-full" value={username} onChange={e => setUsername(e.target.value)} />
              <input type="password" placeholder="Password" className="mb-2 p-2 border w-full" value={password} onChange={e => setPassword(e.target.value)} />
              <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">Login</button>
              <button type="button" className="w-full py-2 mt-2 bg-gray-200 rounded" onClick={() => setShowLogin(false)}>Cancel</button>
            </form>
          </div>
        )}
        <div className="flex-1 overflow-auto p-4 max-w-4xl mx-auto w-full">
          {selectedDept ? (
            <DepartmentView department={selectedDept} onBack={() => setSelectedDept(null)} />
          ) : (
            children
          )}
        </div>
      </main>
    </div>
  );
}
