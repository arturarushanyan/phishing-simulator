import React from 'react';
import PhishingSimulation from '../components/PhishingSimulation';
import PhishingAttempts from '../components/PhishingAttempts';

const Dashboard: React.FC = () => {
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Phishing Simulation
            </h3>
            <div className="mt-4">
              <PhishingSimulation />
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Recent Attempts
            </h3>
            <div className="mt-4">
              <PhishingAttempts />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 