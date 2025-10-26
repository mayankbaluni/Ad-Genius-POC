
import { GoogleGenAI, Type } from "@google/genai";
import type { Product, AdCopy, AdContent } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const adCopySchema = {
  type: Type.OBJECT,
  properties: {
    ad_variations: {
      type: Type.ARRAY,
      description: "3 distinct ad copy variations.",
      items: {
        type: Type.OBJECT,
        properties: {
          headline: {
            type: Type.STRING,
            description: "A catchy headline, under 60 characters.",
          },
          body: {
            type: Type.STRING,
            description: "Compelling body text, under 150 characters.",
          },
          call_to_action: {
            type: Type.STRING,
            description: "A clear call to action, e.g., 'Shop Now' or 'Learn More'.",
          },
        },
        required: ["headline", "body", "call_to_action"],
      },
    },
    image_prompt: {
        type: Type.STRING,
        description: "A detailed, visually rich prompt for an image generation model. Describe a lifestyle photo of the product in an appealing setting. E.g., 'A sleek, modern wireless charger on a minimalist wooden desk next to a steaming cup of coffee and a notebook.'"
    }
  },
  required: ["ad_variations", "image_prompt"],
};

async function generateAdCopyAndImagePrompt(product: Product): Promise<{ copy: AdCopy[], imagePrompt: string }> {
  const prompt = `
    Product Name: ${product.name}
    Product Description: ${product.description}
    
    Generate 3 compelling and distinct ad copy variations and a visually descriptive image prompt for this product.
    Target audience is online shoppers interested in high-quality goods.
    The tone should be enthusiastic but trustworthy.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: adCopySchema,
      temperature: 0.8,
      seed: 42,
    },
  });

  const jsonResponse = JSON.parse(response.text);
  const copy = jsonResponse.ad_variations.map((c: any) => ({
      headline: c.headline,
      body: c.body,
      callToAction: c.call_to_action
  }));

  return { copy, imagePrompt: jsonResponse.image_prompt };
}

async function generateAdImage(prompt: string): Promise<string> {
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '1:1',
        },
    });

    const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
    return `data:image/jpeg;base64,${base64ImageBytes}`;
}

export async function generateAdContent(product: Product): Promise<{ adContent: AdContent, imagePrompt: string }> {
    const { copy, imagePrompt } = await generateAdCopyAndImagePrompt(product);
    const imageUrl = await generateAdImage(imagePrompt);
    
    return {
        adContent: {
            copy,
            imageUrl,
        },
        imagePrompt
    };
}
