<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1gZILXyeIPD32_Vo74zdYu3KrS3t9RVTJ

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Set `GEMINI_API_KEY` to your Gemini API key
   - Set `VITE_STRIPE_PUBLISHABLE_KEY` to your Stripe publishable key (get it from [Stripe Dashboard](https://dashboard.stripe.com/apikeys))

3. Run the app:
   ```bash
   npm run dev
   ```

## Features

- **AI Image Generation**: Upload a pet photo and get 4 funny AI-generated variations
- **Stripe Payment Integration**: Users can purchase and download generated images for $4.99
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Payment Flow

1. User uploads a pet image
2. AI generates 4 funny variations
3. Payment modal appears with Stripe checkout
4. After successful payment, users can download all images
