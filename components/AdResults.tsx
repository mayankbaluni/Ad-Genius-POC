
import React from 'react';
import type { AdContent } from '../types';
import { LoadingSpinner } from './icons/LoadingSpinner';

interface AdResultsProps {
  adContent: AdContent | null;
  isLoading: boolean;
  error: string | null;
}

export const AdResults: React.FC<AdResultsProps> = ({ adContent, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center min-h-[400px]">
        <LoadingSpinner />
        <p className="text-slate-600 mt-4 text-lg">Generating creative content...</p>
        <p className="text-sm text-slate-500 mt-2">This may take up to 30 seconds.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Generation Failed</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!adContent) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center min-h-[400px]">
        <h2 className="text-xl font-semibold text-slate-700">2. View Generated Content</h2>
        <p className="text-slate-500 mt-2 text-center">Your generated ad image and copy variations will appear here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-slate-700">2. Generated Content</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-3 text-slate-600">Ad Image</h3>
          <img src={adContent.imageUrl} alt="Generated Ad" className="rounded-lg shadow-md w-full aspect-square object-cover" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3 text-slate-600">Ad Copy Variations</h3>
          <div className="space-y-4">
            {adContent.copy.map((c, index) => (
              <div key={index} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <p className="font-bold text-primary">{c.headline}</p>
                <p className="text-sm text-slate-700 my-1">{c.body}</p>
                <p className="text-xs font-semibold text-secondary uppercase tracking-wide">{c.callToAction}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
