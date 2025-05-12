import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useState } from 'react';

const schema = yup.object({
  email: yup.string().email('Invalid email address').required('Email is required'),
  template: yup.string().required('Template is required'),
}).required();

type FormData = yup.InferType<typeof schema>;

const PhishingSimulation = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    try {
      setStatus('loading');
      const response = await axios.post('http://localhost:3000/phishing/send', data);
      setStatus('success');
      setMessage('Phishing email sent successfully!');
    } catch (error) {
      setStatus('error');
      setMessage('Failed to send phishing email. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-8 text-gray-800">Phishing Simulation</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Target Email
          </label>
          <input
            {...register('email')}
            type="email"
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Enter target email"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="template" className="block text-sm font-medium text-gray-700 mb-2">
            Template
          </label>
          <select
            {...register('template')}
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          >
            <option value="">Select a template</option>
            <option value="password-reset">Password Reset</option>
            <option value="security-alert">Security Alert</option>
            <option value="account-verification">Account Verification</option>
          </select>
          {errors.template && (
            <p className="mt-2 text-sm text-red-600">{errors.template.message}</p>
          )}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
          >
            {status === 'loading' ? 'Sending...' : 'Send Phishing Email'}
          </button>
        </div>
      </form>

      {message && (
        <div className={`mt-6 p-4 rounded-md ${
          status === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default PhishingSimulation; 