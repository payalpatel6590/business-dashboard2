import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  ArrowTrendingUpIcon,
  BriefcaseIcon,
  ClockIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const LandingPage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <ChartBarIcon className="h-8 w-8 text-blue-500" />,
      title: "Real-Time Analytics",
      description: "Interactive charts and dashboards with live data updates",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <UserGroupIcon className="h-8 w-8 text-green-500" />,
      title: "Role-Based Access",
      description: "Admin and user roles with secure authentication",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <ArrowTrendingUpIcon className="h-8 w-8 text-purple-500" />,
      title: "Revenue Tracking",
      description: "Comprehensive sales and revenue monitoring system",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <BriefcaseIcon className="h-8 w-8 text-orange-500" />,
      title: "Professional Portfolio",
      description: "Showcase your business achievements and projects",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: <ClockIcon className="h-8 w-8 text-indigo-500" />,
      title: "Project History",
      description: "Track your business milestones and achievements",
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">PJP Business Dashboard</span>
            </div>
            <div className="flex items-center space-x-8">
              <Link
                to="/login"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              Transform Your Business with
              <span className="block text-blue-600 dark:text-blue-400">Data-Driven Insights</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
              Professional analytics dashboard built with modern technology
            </p>
          </div>
          
          {/* Stats Cards */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
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
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Ready to Transform Your Business?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Get started with our comprehensive dashboard solution
            </p>
            <div className="mt-8">
              <Link
                to="/register"
                className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 rounded-md text-lg font-medium transition-colors duration-200 inline-flex items-center shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Get Started Now
                <StarIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
