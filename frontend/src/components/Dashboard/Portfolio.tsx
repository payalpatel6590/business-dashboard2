import React from 'react';
import { 
  BriefcaseIcon, 
  CodeBracketIcon,
  ServerIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const Portfolio: React.FC = () => {
  const portfolioItems = [
    {
      title: 'Full-Stack Development',
      description: 'MERN stack application with TypeScript, React, Node.js, Express, and MongoDB Atlas integration',
      icon: <CodeBracketIcon className="h-6 w-6 text-blue-500" />,
      technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
      color: 'blue'
    },
    {
      title: 'Business Analytics',
      description: 'Real-time dashboard with interactive charts, sales tracking, revenue monitoring, and role-based access control',
      icon: <ServerIcon className="h-6 w-6 text-green-500" />,
      technologies: ['Recharts', 'JWT Authentication', 'REST APIs', 'Data Visualization'],
      color: 'green'
    },
    {
      title: 'Cloud Database Integration',
      description: 'MongoDB Atlas cloud database with automatic scaling, backup, and global distribution for enterprise applications',
      icon: <GlobeAltIcon className="h-6 w-6 text-purple-500" />,
      technologies: ['MongoDB Atlas', 'Cloud Storage', 'Data Security', 'Scalability'],
      color: 'purple'
    },
    {
      title: 'Professional UI/UX',
      description: 'Modern, responsive design using Tailwind CSS with dark mode support, accessible components, and mobile-first approach',
      icon: <BriefcaseIcon className="h-6 w-6 text-orange-500" />,
      technologies: ['Tailwind CSS', 'Responsive Design', 'Accessibility', 'Dark Mode', 'Heroicons'],
      color: 'orange'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Professional Portfolio</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portfolioItems.map((item, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className={`p-3 rounded-full bg-${item.color}-100`}>
                {item.icon}
              </div>
              <h3 className="ml-4 text-lg font-semibold text-gray-900">{item.title}</h3>
            </div>
            
            <p className="text-gray-600 mb-4">{item.description}</p>
            
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Technologies Used:</h4>
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex items-center text-center">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200">
                View Project Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
