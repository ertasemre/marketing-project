import { ReactNode } from 'react';
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
  title?: string;
  children: ReactNode;
  variant?: AlertVariant;
  onClose?: () => void;
  className?: string;
}

const Alert = ({
  title,
  children,
  variant = 'info',
  onClose,
  className = '',
}: AlertProps) => {
  
  const variantStyles: Record<AlertVariant, { bg: string; border: string; text: string; icon: React.ReactElement }> = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-400',
      text: 'text-blue-700',
      icon: <InformationCircleIcon className="h-5 w-5 text-blue-400" />
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-400',
      text: 'text-green-700',
      icon: <CheckCircleIcon className="h-5 w-5 text-green-400" />
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-400',
      text: 'text-yellow-700',
      icon: <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-400',
      text: 'text-red-700',
      icon: <XCircleIcon className="h-5 w-5 text-red-400" />
    },
  };
  
  const { bg, border, text, icon } = variantStyles[variant];
  
  return (
    <div className={`${bg} ${border} border-l-4 p-4 rounded-md ${className}`} role="alert">
      <div className="flex">
        <div className="flex-shrink-0">
          {icon}
        </div>
        <div className="ml-3">
          {title && (
            <h3 className={`text-sm font-medium ${text}`}>{title}</h3>
          )}
          <div className={`text-sm ${text} ${title ? 'mt-2' : ''}`}>
            {children}
          </div>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                className={`inline-flex rounded-md p-1.5 ${text} hover:${bg} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${bg} focus:ring-${border}`}
                onClick={onClose}
              >
                <span className="sr-only">Kapat</span>
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert; 