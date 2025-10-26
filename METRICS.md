
# POC Metrics: Methodology

This document explains how we calculate the key performance indicators (KPIs) displayed in the Ad Genius POC. These metrics are designed to prove the technical viability and business value of the solution to investors.

| Metric       | Value (Example) | Target | How It's Measured                                                                                                   |
|--------------|-----------------|--------|---------------------------------------------------------------------------------------------------------------------|
| Latency (s)  | 22.5s           | ≤ 30s  | `performance.now()` timestamps captured in the browser before the first API call and after the final result is processed. |
| Cost ($)     | $0.0020         | ≤ 0.05 | An **estimate** based on current Google Cloud pricing for the models used.                                           |
| Quality (F1) | 1.00            | ≥ 0.90 | A rule-based check confirming the API returned a valid, parsable JSON with all required fields (3 ad copies + image). |
| Time Saved   | 95%             | ≥ 70%  | A business metric calculated against a baseline of a 15-minute manual process.                                      |

---

## 1. Latency

-   **Purpose:** To demonstrate that the user experience is fast enough to feel magical and significantly better than the alternative.
-   **Methodology:** We use the browser's high-resolution timer, `performance.now()`. A timestamp is taken immediately before the `generateAdContent` function is called. A second timestamp is taken after the function successfully returns and the data is ready to be set in the state. The difference, converted to seconds, represents the total wall-clock time for the end-to-end generation process.
-   **Target Rationale:** A target of ≤ 30 seconds is set because it's fast enough to keep a user engaged without context switching, while being realistic for a process involving two sequential, powerful AI model calls.

## 2. Cost Estimate

-   **Purpose:** To prove that the underlying technology is cost-effective and the business model will be profitable.
-   **Methodology:** This is a hardcoded **estimate** for the POC. It is based on:
    -   **Gemini 2.5 Flash:** A small number of input/output tokens for the JSON generation.
    -   **Imagen 4:** The cost of generating a single 1024x1024 image.
    -   The current estimate is `~$0.002` per successful run.
-   **Target Rationale:** A target of ≤ $0.05 per run provides a massive margin for our proposed SaaS pricing (e.g., $49 for 50 generations = ~$1/generation), ensuring high profitability.

## 3. Quality (F1 Score)

-   **Purpose:** To demonstrate the reliability and consistency of the AI's output.
-   **Methodology:** For this POC, we use a simple, binary, rule-based "pass/fail" check. It is not a true F1 score but serves the same purpose of measuring success.
    -   **Pass (1.0):** The API returns a response that is successfully parsed as JSON, contains an array of at least 3 ad copy variations, and includes a generated image URL.
    -   **Fail (0.0):** The process fails at any step, the JSON is malformed, or key fields are missing.
-   **Target Rationale:** A target of ≥ 0.90 signifies that the system should work reliably for at least 9 out of 10 "happy path" requests, which is crucial for user trust.

## 4. Time Saved

-   **Purpose:** To translate the technical performance into a clear and compelling business win for our target customers.
-   **Methodology:** This is a calculated business metric, not a technical one.
    -   **Baseline:** We assume a conservative baseline of **15 minutes (900 seconds)** for a non-expert to manually write 3 ad copies and find a suitable stock image.
    -   **Calculation:** `(1 - (Latency / Baseline Time)) * 100%`
    -   Example: `(1 - (22.5s / 900s)) * 100% = 97.5%`
-   **Target Rationale:** A time savings of ≥ 70% is a "10x" improvement over the manual workflow, making the value proposition undeniable to a potential customer.
