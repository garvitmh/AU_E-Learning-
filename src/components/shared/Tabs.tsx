import React, { useState } from 'react';
import styles from './Tabs.module.css';

export interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  onChange,
  variant = 'default',
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const activeTabData = tabs.find((t) => t.id === activeTab);

  return (
    <div className={styles.container}>
      <div className={`${styles.header} ${styles[`variant-${variant}`]}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''} ${
              tab.disabled ? styles.disabled : ''
            }`}
            onClick={() => handleTabClick(tab.id)}
            disabled={tab.disabled}
            role="tab"
            aria-selected={activeTab === tab.id}
          >
            {tab.icon && <span className={styles.tabIcon}>{tab.icon}</span>}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      {activeTabData && (
        <div className={styles.content} role="tabpanel">
          {activeTabData.content}
        </div>
      )}
    </div>
  );
};
