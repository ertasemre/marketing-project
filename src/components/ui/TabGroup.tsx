import { useState, ReactNode } from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
}

interface TabGroupProps {
  tabs: Tab[];
  defaultTabId?: string;
  onChange?: (tabId: string) => void;
  className?: string;
}

const TabGroup = ({ 
  tabs, 
  defaultTabId, 
  onChange,
  className = '' 
}: TabGroupProps) => {
  const [activeTabId, setActiveTabId] = useState(defaultTabId || tabs[0]?.id);
  
  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId);
    onChange?.(tabId);
  };
  
  return (
    <div className={className}>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`${
                activeTabId === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              aria-current={activeTabId === tab.id ? 'page' : undefined}
            >
              {tab.icon && <span className="mr-2">{tab.icon}</span>}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default TabGroup; 