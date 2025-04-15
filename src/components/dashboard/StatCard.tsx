import { ReactNode } from 'react';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  change?: number;
  changeType?: 'increase' | 'decrease';
  suffix?: string;
  prefix?: string;
  helperText?: string;
}

const StatCard = ({ 
  title, 
  value, 
  icon, 
  change, 
  changeType,
  suffix,
  prefix,
  helperText
}: StatCardProps) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          {icon && (
            <div className="flex-shrink-0">
              {icon}
            </div>
          )}
          <div className={`${icon ? 'ml-5' : ''} w-0 flex-1`}>
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  {prefix}{value}{suffix}
                </div>
                
                {typeof change === 'number' && changeType && (
                  <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                    changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {changeType === 'increase' ? (
                      <ArrowTrendingUpIcon className="self-center flex-shrink-0 h-5 w-5 text-green-500" />
                    ) : (
                      <ArrowTrendingDownIcon className="self-center flex-shrink-0 h-5 w-5 text-red-500" />
                    )}
                    <span className="ml-1">{Math.abs(change)}%</span>
                  </div>
                )}
              </dd>
              
              {helperText && (
                <div className="mt-1 text-sm text-gray-500">
                  {helperText}
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard; 