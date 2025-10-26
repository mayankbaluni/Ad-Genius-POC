
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-primary p-2 rounded-lg">
            <SparklesIcon className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Ad Genius <span className="text-sm font-normal text-primary">POC</span></h1>
        </div>
        <a 
            href="https://github.com/your-repo/ad-genius-poc"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-500 hover:text-primary transition-colors"
        >
            View on GitHub
        </a>
      </div>
    </header>
  );
};
