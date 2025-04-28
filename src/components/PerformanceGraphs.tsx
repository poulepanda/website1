import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface ChartData {
  value: number;
  color: string;
  labelKey: string;
}

const BarChart: React.FC<{ data: ChartData[] }> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const bars = chartRef.current?.querySelectorAll('.bar-inner');
            bars?.forEach((bar) => {
              if (bar instanceof HTMLElement) {
                bar.style.width = bar.dataset.value + '%';
              }
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => {
      if (chartRef.current) {
        observer.unobserve(chartRef.current);
      }
    };
  }, []);

  return (
    <div ref={chartRef} className="space-y-6">
      {data.map((item, index) => (
        <div key={index} className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-gray-700 font-medium">{t(item.labelKey)}</span>
            <span className="text-gray-900 font-bold">{item.value}%</span>
          </div>
          <div className="h-5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="bar-inner h-full rounded-full transition-all duration-1500 ease-out" 
              style={{ backgroundColor: item.color, width: '0%' }}
              data-value={item.value}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

interface CircleChartProps {
  percentage: number;
  color: string;
  labelKey: string;
  size?: number;
  strokeWidth?: number;
}

const CircleChart: React.FC<CircleChartProps> = ({ 
  percentage, 
  color,
  labelKey,
  size = 160, 
  strokeWidth = 12 
}) => {
  const circleRef = useRef<SVGCircleElement>(null);
  const { t } = useLanguage();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && circleRef.current) {
            setTimeout(() => {
              if (circleRef.current) {
                circleRef.current.style.strokeDashoffset = calculateStrokeDashoffset(percentage);
              }
            }, 300);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (circleRef.current?.parentElement?.parentElement) {
      observer.observe(circleRef.current.parentElement.parentElement);
    }

    return () => {
      if (circleRef.current?.parentElement?.parentElement) {
        observer.unobserve(circleRef.current.parentElement.parentElement);
      }
    };
  }, [percentage]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  
  const calculateStrokeDashoffset = (percent: number): string => {
    return String(circumference - (percent / 100) * circumference);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
          />
          <circle
            ref={circleRef}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            className="transition-all duration-1500 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold text-gray-900">{percentage}%</span>
        </div>
      </div>
      <p className="mt-4 text-lg font-medium text-gray-700 text-center">{t(labelKey)}</p>
    </div>
  );
};

const PerformanceGraphs: React.FC = () => {
  const { t } = useLanguage();

  const performanceData: ChartData[] = [
    { value: 85, color: '#3B82F6', labelKey: 'performance.efficiency' },
    { value: 76, color: '#10B981', labelKey: 'performance.productivity' },
    { value: 92, color: '#6366F1', labelKey: 'performance.satisfaction' },
    { value: 68, color: '#F59E0B', labelKey: 'performance.roi' },
  ];

  const circleData = [
    { value: 92, color: '#3B82F6', labelKey: 'performance.accuracy' },
    { value: 78, color: '#10B981', labelKey: 'performance.reliability' },
    { value: 85, color: '#6366F1', labelKey: 'performance.speed' },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('performance.title')}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {t('performance.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">{t('performance.title')}</h3>
            <BarChart data={performanceData} />
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">{t('performance.title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {circleData.map((item, index) => (
                <CircleChart
                  key={index}
                  percentage={item.value}
                  color={item.color}
                  labelKey={item.labelKey}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerformanceGraphs;