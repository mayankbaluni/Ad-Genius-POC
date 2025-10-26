
# Limitations, Risks & Mitigations

This is a Proof of Concept (POC) designed to demonstrate core value quickly. It is not a production-ready application. Below are the key limitations and associated risks.

### 1. Client-Side API Key Exposure
-   **Limitation/Risk**: The Google Gemini API key is included in the client-side code and is visible in browser network requests. This is a major security risk, as the key could be stolen and abused, leading to unexpected costs.
-   **Mitigation for Production**: Create a backend service (e.g., a Node.js/Express server or a serverless function) that acts as a proxy. The frontend would call this backend, and the backend would securely store the API key and make the actual calls to the Gemini API.

### 2. Quality of Generated Content
-   **Limitation/Risk**: The quality of the ad copy and images is entirely dependent on the model's output and the quality of the input prompt. It can sometimes be generic, factually incorrect, or not aligned with a brand's specific voice. There is no "human-in-the-loop" for review.
-   **Mitigation for Next Steps**:
    -   Implement a feature allowing users to edit the generated content.
    -   Develop more sophisticated prompt engineering techniques, possibly allowing users to specify a tone of voice or target audience.
    -   Build a "thumbs up/down" feedback system to collect data for future model fine-tuning.

### 3. Lack of Determinism
-   **Limitation/Risk**: While we set a `seed` for the text model, generative AI is not fully deterministic. The same input may produce slightly different outputs on different runs, especially for images. This can be a challenge for automated testing and ensuring consistent user experience.
-   **Mitigation for Next Steps**: For core use cases, establish a "golden dataset" of inputs and their acceptable outputs. Run these through the system regularly to detect significant "drift" in model performance.

### 4. Error Handling
-   **Limitation/Risk**: The current error handling is basic. It catches exceptions from the API call and displays a generic message. It doesn't handle specific API errors (e.g., rate limits, content safety blocks, invalid requests) gracefully.
-   **Mitigation for Production**: Implement more robust error handling that parses API error codes and provides more specific feedback to the user (e.g., "Your request was blocked for safety reasons," or "API is currently overloaded, please try again in a moment."). Implement a retry mechanism with exponential backoff for transient errors.

### 5. Scalability & Cost Management
-   **Limitation/Risk**: The application makes direct API calls per user action. There is no caching or monitoring. A large number of users could lead to high API costs and potential rate limiting. Cost estimation is currently hardcoded.
-   **Mitigation for Production**:
    -   Introduce a backend service to manage and monitor API usage.
    -   Implement caching for identical requests to reduce redundant API calls.
    -   Set up billing alerts in the Google Cloud Platform console.
    -   Calculate token usage more accurately to provide better cost estimates to users.
