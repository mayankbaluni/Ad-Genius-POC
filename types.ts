
export interface Product {
  name: string;
  description: string;
}

export interface AdCopy {
  headline: string;
  body: string;
  callToAction: string;
}

export interface AdContent {
  copy: AdCopy[];
  imageUrl: string;
}

export interface GenerationMetrics {
  latency: number;
  cost: number;
  quality: number;
  timeSaved: number;
  imagePrompt: string;
}
