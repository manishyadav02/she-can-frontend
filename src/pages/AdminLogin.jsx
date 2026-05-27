import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Lock, Loader2 } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setError('');
      try {
        const res = await axios.post('http://localhost:5000/api/v1/auth/login', values);
        localStorage.setItem('adminToken', res.data.token);
        navigate('/admin/dashboard');
      } catch (err) {
        setError(err.response?.data?.error || 'Login failed');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-slate-100">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-primary-100 flex items-center justify-center rounded-full mb-4">
            <Lock className="h-6 w-6 text-primary-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">Admin Portal</h2>
          <p className="mt-2 text-sm text-slate-600">
            Sign in to access foundation submissions.
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email address</label>
              <input
                type="email"
                {...formik.getFieldProps('email')}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-slate-50 transition-all"
                placeholder="admin@shecanfoundation.org"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                type="password"
                {...formik.getFieldProps('password')}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-slate-50 transition-all"
                placeholder="••••••••"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-70 transition-all items-center"
          >
            {formik.isSubmitting ? (
              <><Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" /> Authenticating...</>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
