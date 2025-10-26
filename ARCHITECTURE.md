
# Architecture & Dataflow

This POC is a client-side React Single Page Application (SPA) that communicates directly with the Google Gemini API.

## Components

1.  **Frontend (React SPA)**:
    -   Built with React 18, TypeScript, and Vite.
    -   Styled with Tailwind CSS.
    -   Manages all application state and user interaction.
    -   Responsible for rendering the UI and orchestrating API calls.

2.  **Google Gemini API (External Service)**:
    -   Provides the generative AI capabilities.
    -   We use two models:
        -   `gemini-2.5-flash`: For generating structured JSON (ad copy and image prompt).
        -   `imagen-4.0-generate-001`: For generating the ad image from a text prompt.

## Dataflow Sequence Diagram

This diagram illustrates the end-to-end flow when a user clicks "Generate Ad Content".

```
User --(1. Clicks Generate)--> React App
 |
 +--(2. Sets Loading State)--> UI
 |
 +--(3. generateAdContent(product))--> geminiService.ts
     |
     +--(4. generateContent({model: 'gemini-2.5-flash', ...}))--> Google Gemini API
     |
     <--(5. Returns Ad Copy JSON & Image Prompt)-- Google Gemini API
     |
     +--(6. generateImages({model: 'imagen-4.0-generate-001', prompt: ...}))--> Google Gemini API
     |
     <--(7. Returns Base64 Image)-- Google Gemini API
     |
 <--(8. Returns AdContent object {copy, imageUrl})-- geminiService.ts
 |
 +--(9. Sets Results & Metrics State)--> React App
 |
 L--(10. Renders Results & Metrics)--> UI
```

### Flow Description

1.  **User Interaction**: The user provides product details and clicks the "Generate" button.
2.  **State Update**: The React app sets its state to `isLoading=true`, which updates the UI to show a loading indicator and disables the button.
3.  **Service Call**: The `App` component calls the `generateAdContent` function in `geminiService.ts`.
4.  **First API Call (Text)**: The service makes the first API call to `gemini-2.5-flash`, providing the product details and requesting a structured JSON output containing ad copy variations and a new, detailed prompt for the image model.
5.  **First API Response**: The Gemini API returns the structured JSON.
6.  **Second API Call (Image)**: The service extracts the `image_prompt` from the first response and makes a second API call to `imagen-4.0-generate-001` to generate the image.
7.  **Second API Response**: The Imagen model returns the generated image as a base64 encoded string.
8.  **Service Return**: The `geminiService` combines the results into a single `AdContent` object and returns it to the `App` component.
9.  **Final State Update**: The `App` component sets `isLoading=false`, populates the `adContent` state with the results, and calculates performance metrics.
10. **UI Render**: React re-renders the UI to display the ad image, copy, and the metrics panel.
