import React from 'react';
import { CalendarIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface HistoryItem {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'milestone' | 'achievement' | 'update';
  status: 'completed' | 'in-progress';
}

const HistoryTimeline: React.FC = () => {
  const historyItems: HistoryItem[] = [
    {
      id: '1',
      title: 'PJP Business Dashboard Launched',
      description: 'Initial development of comprehensive business analytics platform with MERN stack, TypeScript, and Tailwind CSS',
      date: '2024-01-15',
      type: 'milestone',
      status: 'completed'
    },
    {
      id: '2',
      title: 'MongoDB Atlas Integration',
      description: 'Successfully connected production database with cloud-based MongoDB Atlas for scalable data storage',
      date: '2024-01-20',
      type: 'achievement',
      status: 'completed'
    },
    {
      id: '3',
      title: 'Authentication System',
      description: 'Implemented JWT-based authentication with role-based access control for admin and user roles',
      date: '2024-01-25',
      type: 'achievement',
      status: 'completed'
    },
    {
      id: '4',
      title: 'Real-time Analytics Dashboard',
      description: 'Added interactive charts for sales, revenue, and user statistics with Recharts library',
      date: '2024-02-01',
      type: 'milestone',
      status: 'completed'
    },
    {
      id: '5',
      title: 'Dark Mode Implementation',
      description: 'Enhanced user experience with dark/light theme toggle functionality',
      date: '2024-02-10',
      type: 'achievement',
      status: 'completed'
    },
    {
      id: '6',
      title: 'Mobile Responsive Design',
      description: 'Optimized application for mobile, tablet, and desktop devices with Tailwind CSS',
      date: '2024-02-15',
      type: 'achievement',
      status: 'completed'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'milestone':
        return <CalendarIcon className="h-5 w-5 text-blue-500" />;
      case 'achievement':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'update':
        return <ClockIcon className="h-5 w-5 text-orange-500" />;
      default:
        return <CalendarIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Project History & Timeline</h2>
      
      <div className="space-y-6">
        {historyItems.map((item, index) => (
          <div key={item.id} className="flex items-start space-x-4 p-4 border-l-4 border-gray-200">
            <div className="flex-shrink-0">
              <div className={`p-3 rounded-full ${getStatusColor(item.status)}`}>
                {getTypeIcon(item.type)}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="text-xs text-gray-500 mt-2">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryTimeline;
