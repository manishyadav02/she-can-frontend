import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2 } from 'lucide-react';

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(50, 'Must be 50 characters or less')
        .required('Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      message: Yup.string()
        .min(10, 'Must be at least 10 characters')
        .required('Message is required'),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitError('');
      try {
        await axios.post('http://localhost:5000/api/v1/forms/submit', values);
        setIsSubmitted(true);
        resetForm();
      } catch (error) {
        setSubmitError(
          error.response?.data?.error || 'Something went wrong. Please try again.'
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden relative min-h-[400px] flex items-center justify-center p-8 lg:p-12">
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center text-center space-y-4"
          >
            <div className="h-20 w-20 bg-green-50 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Form Submitted Successfully!</h3>
            <p className="text-slate-600 max-w-sm">
              Thank you for connecting with She Can Foundation. Together we can change the world.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-6 px-6 py-2 bg-primary-50 text-primary-700 font-medium rounded-full hover:bg-primary-100 transition-colors"
            >
              Send Another Message
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900">Get Involved</h2>
              <p className="text-slate-600 mt-2">Reach out to volunteer or learn more about our cause.</p>
            </div>

            {submitError && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100">
                {submitError}
              </div>
            )}

            <form onSubmit={formik.handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...formik.getFieldProps('name')}
                  className={`text-slate-900 w-full px-4 py-3 rounded-xl border ${
                    formik.touched.name && formik.errors.name
                      ? 'border-red-300 focus:ring-red-500 bg-red-50'
                      : 'border-slate-200 focus:ring-primary-500 bg-slate-50'
                  } focus:outline-none focus:ring-2 transition-all`}
                  placeholder="Jane Doe"
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
                ) : (
                  formik.touched.name && <div className="text-green-500 text-sm mt-1">Looks good!</div>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  {...formik.getFieldProps('email')}
                  className={`text-slate-900 w-full px-4 py-3 rounded-xl border ${
                    formik.touched.email && formik.errors.email
                      ? 'border-red-300 focus:ring-red-500 bg-red-50'
                      : 'border-slate-200 focus:ring-primary-500 bg-slate-50'
                  } focus:outline-none focus:ring-2 transition-all`}
                  placeholder="jane@example.com"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                ) : (
                  formik.touched.email && <div className="text-green-500 text-sm mt-1">Looks good!</div>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  {...formik.getFieldProps('message')}
                  className={`text-slate-900 w-full px-4 py-3 rounded-xl border ${
                    formik.touched.message && formik.errors.message
                      ? 'border-red-300 focus:ring-red-500 bg-red-50'
                      : 'border-slate-200 focus:ring-primary-500 bg-slate-50'
                  } focus:outline-none focus:ring-2 transition-all resize-none`}
                  placeholder="How would you like to help?"
                />
                {formik.touched.message && formik.errors.message ? (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.message}</div>
                ) : (
                  formik.touched.message && <div className="text-green-500 text-sm mt-1">Looks good!</div>
                )}
              </div>

              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full bg-primary-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {formik.isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;
