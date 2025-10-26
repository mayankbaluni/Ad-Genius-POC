
# Ad Genius - Investor POC

This repository contains a functional Proof of Concept (POC) for **Ad Genius**, an AI-powered tool that generates marketing ad copy and corresponding images for e-commerce products.

**Project Vision:** To empower e-commerce businesses to create high-quality ad campaigns in seconds, not hours.

## 1. Setup (90 seconds)

This project is a standard React application built with Vite.

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Environment Variables

You must have a Google Gemini API key to run this application.

1.  Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey).
2.  Create a file named `.env` in the root of the project.
3.  Add your API key to the `.env` file:

    ```
    API_KEY=your_google_api_key_here
    ```

    _Note: In a Vite project, environment variables must be prefixed with `VITE_` to be exposed to the client. For this simplified POC, we use a workaround by assuming `process.env.API_KEY` is available. In a real build, this would be `VITE_API_KEY=...` and accessed via `import.meta.env.VITE_API_KEY`._

### Installation & Running

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will now be running at `http://localhost:5173`.

## 2. How to Demo

The web interface is the demo. Follow the on-screen instructions:
1.  The app loads with a sample product.
2.  Click the **"Generate Ad Content"** button.
3.  Observe the loading state (this can take up to 30 seconds as it calls two different AI models).
4.  View the generated ad image and three distinct copy variations on the right.
5.  Below the results, review the **POC Metrics** table, which shows latency, estimated cost, quality score, and time saved.
6.  Use the "Or load a sample" dropdown to test other pre-written product descriptions, including an "edge case" with a vague description.

## 3. Project Structure

-   `index.html`: Main entry point with Tailwind CSS setup.
-   `index.tsx`: React application root.
-   `App.tsx`: Main application component, handles state and logic.
-   `components/`: Reusable UI components.
-   `services/geminiService.ts`: Abstraction layer for all Google Gemini API calls.
-   `types.ts`: TypeScript type definitions.
-   `data/sampleProducts.ts`: Sample data for the demo.
