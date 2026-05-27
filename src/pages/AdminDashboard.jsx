import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogOut, Loader2, Mail, Calendar, User } from 'lucide-react';

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubmissions = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin/login');
        return;
      }

      try {
        const res = await axios.get('http://localhost:5000/api/v1/admin/submissions', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSubmissions(res.data.data);
      } catch (err) {
        setError('Failed to fetch submissions. Please login again.');
        if (err.response?.status === 401) {
          localStorage.removeItem('adminToken');
          navigate('/admin/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-12 w-12 text-primary-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-600 mt-1">Manage foundation inquiries and volunteers.</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white text-slate-700 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm font-medium"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-200">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">Name</th>
                  <th className="p-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">Contact Info</th>
                  <th className="p-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">Message</th>
                  <th className="p-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {submissions.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-slate-500">No submissions found.</td>
                  </tr>
                ) : (
                  submissions.map((sub) => (
                    <tr key={sub._id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xs">
                            {sub.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-slate-900">{sub.name}</span>
                        </div>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <div className="flex items-center text-slate-600 gap-2">
                          <Mail className="h-4 w-4 text-slate-400" />
                          <a href={`mailto:${sub.email}`} className="hover:text-primary-600">{sub.email}</a>
                        </div>
                      </td>
                      <td className="p-4 max-w-md">
                        <p className="text-slate-700 whitespace-pre-wrap">{sub.message}</p>
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-slate-400" />
                          {new Date(sub.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-slate-100">
             {submissions.length === 0 ? (
                <div className="p-8 text-center text-slate-500">No submissions found.</div>
              ) : (
                submissions.map((sub) => (
                  <div key={sub._id} className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-primary-500" />
                        <span className="font-bold text-slate-900">{sub.name}</span>
                      </div>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                         <Calendar className="h-3 w-3" /> {new Date(sub.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                       <Mail className="h-4 w-4 text-slate-400" /> {sub.email}
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg text-sm text-slate-700 border border-slate-100">
                      {sub.message}
                    </div>
                  </div>
                ))
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
