
import React from 'react';
import type { Product } from '../types';
import { sampleProducts } from '../data/sampleProducts';

interface ProductInputProps {
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
  onGenerate: () => void;
  isLoading: boolean;
}

export const ProductInput: React.FC<ProductInputProps> = ({ product, setProduct, onGenerate, isLoading }) => {

  const handleSampleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProduct = sampleProducts[parseInt(e.target.value, 10)];
    setProduct(selectedProduct);
  };
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-4 text-slate-700">1. Enter Product Details</h2>
      
      <div className="mb-4">
        <label htmlFor="sample-product" className="block text-sm font-medium text-slate-600 mb-1">
          Or load a sample
        </label>
        <select
          id="sample-product"
          onChange={handleSampleSelect}
          className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        >
          {sampleProducts.map((p, i) => (
            <option key={i} value={i}>{p.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="product-name" className="block text-sm font-medium text-slate-600 mb-1">
          Product Name
        </label>
        <input
          type="text"
          id="product-name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          placeholder="e.g., Aura Smart Mug"
        />
      </div>

      <div className="mb-6 flex-grow flex flex-col">
        <label htmlFor="product-description" className="block text-sm font-medium text-slate-600 mb-1">
          Product Description
        </label>
        <textarea
          id="product-description"
          rows={6}
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
          className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary flex-grow"
          placeholder="Describe the product's features, benefits, and target audience."
        />
      </div>

      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          'Generate Ad Content'
        )}
      </button>
    </div>
  );
};
