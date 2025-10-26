
import React from 'react';
import type { GenerationMetrics } from '../types';

interface MetricsPanelProps {
  metrics: GenerationMetrics;
}

const MetricItem: React.FC<{ label: string; value: string; target: string; pass: boolean; tooltip?: string }> = ({ label, value, target, pass, tooltip }) => (
  <tr className="border-b border-slate-200">
    <td className="py-2 pr-2 text-slate-600 font-medium">{label}</td>
    <td className="py-2 px-2 text-right">{value}</td>
    <td className="py-2 px-2 text-right text-slate-500">{target}</td>
    <td className="py-2 pl-2 text-center">{pass ? '✅' : '❌'}</td>
  </tr>
);


export const MetricsPanel: React.FC<MetricsPanelProps> = ({ metrics }) => {
  return (
    <div className="bg-white mt-8 p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-slate-700">3. POC Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-500 uppercase">
                <th className="py-2 pr-2 font-semibold">Metric</th>
                <th className="py-2 px-2 font-semibold text-right">Value</th>
                <th className="py-2 px-2 font-semibold text-right">Target</th>
                <th className="py-2 pl-2 font-semibold text-center">Pass?</th>
              </tr>
            </thead>
            <tbody>
              <MetricItem label="Latency (s)" value={metrics.latency.toFixed(2)} target="≤ 30" pass={metrics.latency <= 30} />
              <MetricItem label="Cost ($)" value={metrics.cost.toFixed(4)} target="≤ 0.05" pass={metrics.cost <= 0.05} />
              <MetricItem label="Quality (F1)" value={metrics.quality.toFixed(2)} target="≥ 0.90" pass={metrics.quality >= 0.90} />
              <MetricItem label="Time Saved" value={`${Math.round(metrics.timeSaved * 100)}%`} target="≥ 70%" pass={metrics.timeSaved >= 0.70} />
            </tbody>
          </table>
        </div>
        <div>
          <label className="block text-xs uppercase text-slate-500 font-semibold mb-1">Image Prompt</label>
          <p className="text-sm bg-slate-100 p-3 rounded-md border border-slate-200 text-slate-600">
            {metrics.imagePrompt}
          </p>
        </div>
      </div>
    </div>
  );
};
