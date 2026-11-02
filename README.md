# Wanda Tips Mobile

A complete Expo mobile app starter for Wanda Tips built with React Native, navigation, auth flow, profile, prediction logic, and screenshot analysis integration.

## What is included
- Login and signup screens
- Auth persistence using secure storage
- User profile screen
- Bankroll tracking and league selection
- Fixture prediction dashboard
- Screenshot upload and Gemini AI analysis
- Dark sports app styling
- Real API-ready service layer with demo fallback

## Requirements
- Node.js 18+
- npm or yarn
- Expo CLI

## Install
npm install

## Run the app
npm start

Then launch:
- Android emulator: npm run android
- iOS simulator: npm run ios

## Environment variables
Create a `.env` file if you plan to connect to a real backend or API:

EXPO_PUBLIC_API_URL=https://your-api-url.com
EXPO_PUBLIC_GEMINI_API_KEY=your_key_here

## Notes
- The app is ready as a productive starter foundation.
- If you connect a real backend later, replace the demo auth and data placeholders in `src/services/api.ts`.
- The AI screenshot scan will work once a valid Gemini API key is supplied.

## Recommended next step for a real app
Connect this app to:
- Supabase for auth, profile, and app data
- A football odds API for live fixtures and odds
- A real backend for saving scans/history

This gives you a solid product base without starting from scratch.
