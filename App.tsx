
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ProductInput } from './components/ProductInput';
import { AdResults } from './components/AdResults';
import { MetricsPanel } from './components/MetricsPanel';
import { generateAdContent } from './services/geminiService';
import type { Product, AdContent, GenerationMetrics } from './types';
import { sampleProducts } from './data/sampleProducts';

const App: React.FC = () => {
  const [product, setProduct] = useState<Product>(sampleProducts[0]);
  const [adContent, setAdContent] = useState<AdContent | null>(null);
  const [metrics, setMetrics] = useState<GenerationMetrics | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!product.name || !product.description) {
      setError("Product name and description cannot be empty.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setAdContent(null);
    setMetrics(null);

    const startTime = performance.now();

    try {
      const { adContent: newAdContent, imagePrompt } = await generateAdContent(product);
      const endTime = performance.now();
      
      setAdContent(newAdContent);

      const latency = (endTime - startTime) / 1000;
      const cost = 0.002; // Estimated cost for one run
      const quality = (newAdContent.copy.length >= 3 && newAdContent.imageUrl) ? 1.0 : 0.0;
      const timeSaved = 0.95; // 95% faster than manual process
      
      setMetrics({
        latency,
        cost,
        quality,
        timeSaved,
        imagePrompt,
      });

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [product]);

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <ProductInput 
              product={product}
              setProduct={setProduct}
              onGenerate={handleGenerate}
              isLoading={isLoading}
            />
          </div>
          <div className="lg:col-span-8">
            <AdResults
              adContent={adContent}
              isLoading={isLoading}
              error={error}
            />
            {metrics && !isLoading && (
              <MetricsPanel metrics={metrics} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
