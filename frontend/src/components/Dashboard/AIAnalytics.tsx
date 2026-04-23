import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAdvancedTheme } from '../../contexts/AdvancedThemeContext';
import {
  TrendingUpIcon,
  TrendingDownIcon,
  SparklesIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

interface AIMetric {
  id: string;
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  insight: string;
  confidence: number;
  category: 'revenue' | 'sales' | 'customer' | 'performance';
}

interface AIPrediction {
  metric: string;
  current: number;
  predicted: number;
  confidence: number;
  timeframe: string;
  factors: string[];
}

const AIAnalytics: React.FC = () => {
  const { colors, effectiveTheme } = useAdvancedTheme();
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);
  const [predictions, setPredictions] = useState<AIPrediction[]>([]);

  const aiMetrics: AIMetric[] = [
    {
      id: '1',
      title: 'AI Revenue Forecast',
      value: '$124,500',
      change: 23.4,
      trend: 'up',
      insight: 'Revenue expected to grow 18% next quarter based on current trends',
      confidence: 0.92,
      category: 'revenue'
    },
    {
      id: '2',
      title: 'Customer Lifetime Value',
      value: '$2,340',
      change: 12.1,
      trend: 'up',
      insight: 'CLV increased due to improved retention strategies',
      confidence: 0.88,
      category: 'customer'
    },
    {
      id: '3',
      title: 'Sales Conversion Rate',
      value: '4.8%',
      change: -2.3,
      trend: 'down',
      insight: 'Conversion rate slightly down, but average order value up 15%',
      confidence: 0.79,
      category: 'sales'
    },
    {
      id: '4',
      title: 'Market Penetration',
      value: '67%',
      change: 8.2,
      trend: 'up',
      insight: 'Strong growth in emerging markets identified',
      confidence: 0.85,
      category: 'performance'
    }
  ];

  const forecastData = [
    { month: 'Jan', actual: 85000, predicted: 88000 },
    { month: 'Feb', actual: 92000, predicted: 95000 },
    { month: 'Mar', actual: 98000, predicted: 102000 },
    { month: 'Apr', actual: 105000, predicted: 109000 },
    { month: 'May', actual: 112000, predicted: 116000 },
    { month: 'Jun', actual: 124500, predicted: 128000 },
    { month: 'Jul', actual: null, predicted: 135000 },
    { month: 'Aug', actual: null, predicted: 142000 },
    { month: 'Sep', actual: null, predicted: 148000 }
  ];

  const categoryPerformance = [
    { category: 'Electronics', current: 45000, potential: 62000, growth: 38 },
    { category: 'Clothing', current: 28000, potential: 35000, growth: 25 },
    { category: 'Food', current: 22000, potential: 31000, growth: 41 },
    { category: 'Software', current: 18000, potential: 28000, growth: 56 },
    { category: 'Services', current: 11500, potential: 19000, growth: 65 }
  ];

  const customerSegments = [
    { segment: 'Premium', value: 35, customers: 1200, avgOrder: 450 },
    { segment: 'Regular', value: 45, customers: 3400, avgOrder: 180 },
    { segment: 'Occasional', value: 20, customers: 2800, avgOrder: 85 }
  ];

  const performanceRadar = [
    metric: 'Sales Growth',
    current: 85,
    target: 90
  },
    {
      metric: 'Customer Satisfaction',
      current: 78,
      target: 85
    },
    {
      metric: 'Market Share',
      current: 72,
      target: 80
    },
    {
      metric: 'Profit Margin',
      current: 68,
      target: 75
    },
    {
      metric: 'Brand Recognition',
      current: 82,
      target: 88
    },
    {
      metric: 'Innovation Index',
      current: 76,
      target: 85
    }
  ];

  const pieColors = effectiveTheme === 'dark' 
    ? ['#60a5fa', '#818cf8', '#a78bfa', '#c084fc', '#e879f9']
    : ['#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#c026d3'];

  const generateNewInsights = async () => {
    setIsGeneratingInsights(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newPredictions: AIPrediction[] = [
      {
        metric: 'Monthly Revenue',
        current: 124500,
        predicted: 148000,
        confidence: 0.89,
        timeframe: 'Next 3 months',
        factors: ['Seasonal trends', 'Market expansion', 'Product launches']
      },
      {
        metric: 'Customer Acquisition',
        current: 450,
        predicted: 680,
        confidence: 0.76,
        timeframe: 'Next quarter',
        factors: ['Marketing campaigns', 'Referral programs', 'Partnerships']
      }
    ];
    
    setPredictions(newPredictions);
    setIsGeneratingInsights(false);
  };

  useEffect(() => {
    generateNewInsights();
  }, []);

  return (
    <div className="space-y-6">
      {/* AI Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600">
            <SparklesIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              AI-Powered Analytics
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Real-time insights and predictions
            </p>
          </div>
        </div>
        
        <motion.button
          onClick={generateNewInsights}
          disabled={isGeneratingInsights}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-lg
            ${effectiveTheme === 'dark'
              ? 'bg-gray-800 hover:bg-gray-700'
              : 'bg-gray-100 hover:bg-gray-200'
            }
            transition-colors
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowPathIcon className={`h-4 w-4 ${isGeneratingInsights ? 'animate-spin' : ''}`} />
          <span>Refresh Insights</span>
        </motion.button>
      </motion.div>

      {/* AI Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {aiMetrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedMetric(metric.id)}
            className={`
              p-4 rounded-xl border cursor-pointer transition-all
              ${selectedMetric === metric.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : effectiveTheme === 'dark'
                  ? 'border-gray-700 bg-gray-800 hover:bg-gray-700'
                  : 'border-gray-200 bg-white hover:bg-gray-50'
              }
            `}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                  {metric.title}
                </h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metric.value}
                </p>
              </div>
              <div className={`
                p-2 rounded-lg
                ${metric.trend === 'up' ? 'bg-green-100 text-green-600' :
                  metric.trend === 'down' ? 'bg-red-100 text-red-600' :
                  'bg-gray-100 text-gray-600'}
              `}>
                {metric.trend === 'up' ? (
                  <TrendingUpIcon className="h-4 w-4" />
                ) : metric.trend === 'down' ? (
                  <TrendingDownIcon className="h-4 w-4" />
                ) : (
                  <ChartBarIcon className="h-4 w-4" />
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm">
              <span className={`
                ${metric.change > 0 ? 'text-green-600' : 'text-red-600'}
              `}>
                {metric.change > 0 ? '+' : ''}{metric.change}%
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-500 text-xs">
                {Math.round(metric.confidence * 100)}% confidence
              </span>
            </div>
            
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {metric.insight}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Forecast */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`
            p-6 rounded-xl border
            ${effectiveTheme === 'dark'
              ? 'border-gray-700 bg-gray-800'
              : 'border-gray-200 bg-white'
            }
          `}
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            AI Revenue Forecast
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
              <XAxis dataKey="month" stroke={colors.textSecondary} />
              <YAxis stroke={colors.textSecondary} />
              <Tooltip
                contentStyle={{
                  backgroundColor: effectiveTheme === 'dark' ? colors.surface : colors.background,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '8px'
                }}
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke={colors.primary}
                strokeWidth={2}
                dot={{ fill: colors.primary }}
              />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke={colors.accent}
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: colors.accent }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Performance */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`
            p-6 rounded-xl border
            ${effectiveTheme === 'dark'
              ? 'border-gray-700 bg-gray-800'
              : 'border-gray-200 bg-white'
            }
          `}
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Category Growth Potential
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
              <XAxis dataKey="category" stroke={colors.textSecondary} />
              <YAxis stroke={colors.textSecondary} />
              <Tooltip
                contentStyle={{
                  backgroundColor: effectiveTheme === 'dark' ? colors.surface : colors.background,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="current" fill={colors.primary} />
              <Bar dataKey="potential" fill={colors.accent} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Customer Segments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`
            p-6 rounded-xl border
            ${effectiveTheme === 'dark'
              ? 'border-gray-700 bg-gray-800'
              : 'border-gray-200 bg-white'
            }
          `}
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            AI Customer Segments
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={customerSegments}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {customerSegments.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: effectiveTheme === 'dark' ? colors.surface : colors.background,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {customerSegments.map((segment, index) => (
              <div key={segment.segment} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: pieColors[index % pieColors.length] }}
                  />
                  <span className="text-gray-900 dark:text-white">{segment.segment}</span>
                </div>
                <span className="text-gray-500">{segment.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Performance Radar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`
            p-6 rounded-xl border
            ${effectiveTheme === 'dark'
              ? 'border-gray-700 bg-gray-800'
              : 'border-gray-200 bg-white'
            }
          `}
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Performance Analysis
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={performanceRadar}>
              <PolarGrid stroke={colors.border} />
              <PolarAngleAxis dataKey="metric" stroke={colors.textSecondary} />
              <PolarRadiusAxis stroke={colors.textSecondary} />
              <Radar
                name="Current"
                dataKey="current"
                stroke={colors.primary}
                fill={colors.primary}
                fillOpacity={0.3}
              />
              <Radar
                name="Target"
                dataKey="target"
                stroke={colors.accent}
                fill={colors.accent}
                fillOpacity={0.1}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: effectiveTheme === 'dark' ? colors.surface : colors.background,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '8px'
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* AI Predictions */}
      {predictions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`
            p-6 rounded-xl border
            ${effectiveTheme === 'dark'
              ? 'border-gray-700 bg-gray-800'
              : 'border-gray-200 bg-white'
            }
          `}
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            AI Predictions & Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {predictions.map((prediction, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  p-4 rounded-lg border
                  ${effectiveTheme === 'dark'
                    ? 'border-gray-600 bg-gray-700'
                    : 'border-gray-200 bg-gray-50'
                  }
                `}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {prediction.metric}
                  </h4>
                  <span className="text-sm text-gray-500">
                    {Math.round(prediction.confidence * 100)}% confidence
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 mb-3">
                  <div>
                    <p className="text-sm text-gray-500">Current</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      ${prediction.current.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-gray-400">→</div>
                  <div>
                    <p className="text-sm text-gray-500">Predicted</p>
                    <p className="text-lg font-bold text-green-600">
                      ${prediction.predicted.toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">Key factors:</p>
                  <div className="flex flex-wrap gap-1">
                    {prediction.factors.map((factor, i) => (
                      <span
                        key={i}
                        className={`
                          px-2 py-1 text-xs rounded
                          ${effectiveTheme === 'dark'
                            ? 'bg-gray-600 text-gray-300'
                            : 'bg-gray-200 text-gray-700'
                          }
                        `}
                      >
                        {factor}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AIAnalytics;
