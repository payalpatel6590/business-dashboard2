import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BuildingOfficeIcon,
  UserGroupIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  BriefcaseIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const AboutPage: React.FC = () => {
  const features = [
    {
      icon: <BuildingOfficeIcon className="h-8 w-8 text-blue-500" />,
      title: "Professional Business Dashboard",
      description: "Comprehensive analytics and management platform built with MERN stack, TypeScript, and modern UI/UX design principles",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <UserGroupIcon className="h-8 w-8 text-green-500" />,
      title: "Role-Based Access Control",
      description: "Secure authentication system with admin and user roles, protecting sensitive data and features",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <ChartBarIcon className="h-8 w-8 text-purple-500" />,
      title: "Interactive Data Visualization",
      description: "Real-time charts and graphs using Recharts library for sales, revenue, and user analytics",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <ArrowTrendingUpIcon className="h-8 w-8 text-orange-500" />,
      title: "Advanced Analytics",
      description: "Comprehensive filtering, date range selection, and export functionality for business intelligence",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: <BriefcaseIcon className="h-8 w-8 text-indigo-500" />,
      title: "Professional Portfolio",
      description: "LinkedIn-ready portfolio showcase with technology stack display and project achievements",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: <ClockIcon className="h-8 w-8 text-gray-500" />,
      title: "Project History",
      description: "Interactive timeline showing development milestones, achievements, and project progression",
      color: "from-gray-500 to-gray-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
            About PJP Business Dashboard
          </h1>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
            Professional analytics and management platform
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-gradient-to-r ${feature.color} p-3`}>
                {feature.icon}
              </div>
              <h3 className="mt-6 text-lg font-semibold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Ready to Transform Your Business?
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Discover the power of professional analytics and management
          </p>
          <div className="mt-8">
            <Link
              to="/dashboard"
              className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 rounded-md text-lg font-medium transition-colors duration-200 inline-flex items-center shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
