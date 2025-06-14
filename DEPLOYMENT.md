# Deployment and API Key Setup for Crumbs Collector Chrome Extension

## Overview

This document provides instructions to deploy the Crumbs Collector app and supabase function, and securely set the Perplexity API key required for AI features.

## 1. Set Perplexity API Key for Supabase Function

The supabase edge function `perplexity-summary` requires the Perplexity API key as an environment variable:

- Variable name: `PERPLEXITY_API_KEY`
- Value: Your Perplexity API key (e.g., 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)

### Steps:

1. Go to your Supabase project dashboard.
2. Navigate to the "Functions" section.
3. Select the `perplexity-summary` function.
4. Set the environment variable `PERPLEXITY_API_KEY` with your API key.
5. Redeploy the function if necessary.

## 2. Deploy the React App

The React app serves as the main UI for the extension popup.

### Steps:

1. Build the React app using:

   ```bash
   npm run build
   ```

2. Deploy the built app to a hosting service (e.g., Vercel, Netlify, or Lovable).

3. Obtain the deployed app URL.

## 3. Update Chrome Extension Popup

1. In `public/popup.html`, update the script import or React app URL if needed.

2. The extension popup will load the React app UI directly.

## 4. Load the Extension Locally for Testing

1. Open Chrome and go to `chrome://extensions/`.

2. Enable "Developer mode".

3. Click "Load unpacked" and select the extension directory (`public` folder).

4. Test the extension popup and AI features.

## 5. Publish the Extension

1. Package the extension files.

2. Submit to Chrome Web Store following their guidelines.

## Notes

- Keep your Perplexity API key secure and do not expose it publicly.

- The extension uses manifest version 3 with a background service worker.

- Permissions include storage, activeTab, scripting, and host permissions for all URLs.

---

For any issues or questions, please contact the project maintainer.
