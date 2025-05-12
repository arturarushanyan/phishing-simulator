import { useEffect, useState } from 'react';
import axios from 'axios';

interface PhishingAttempt {
  _id: string;
  targetEmail: string;
  template: string;
  status: string;
  clicked: boolean;
  sentAt: string;
  createdAt: string;
  errorMessage?: string;
}

const PhishingAttempts = () => {
  const [attempts, setAttempts] = useState<PhishingAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/phishing/attempts');
        setAttempts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch phishing attempts');
        setLoading(false);
      }
    };

    fetchAttempts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-md">
        {error}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Target Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Template
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Clicked
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sent At
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Error
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {attempts.map((attempt) => (
            <tr key={attempt._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {attempt.targetEmail}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {attempt.template}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  attempt.status === 'sent' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {attempt.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  attempt.clicked ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {attempt.clicked ? 'Yes' : 'No'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(attempt.sentAt).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                {attempt.errorMessage || '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PhishingAttempts; 