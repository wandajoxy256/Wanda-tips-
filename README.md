# Wanda Tips Mobile

A mobile app version of Wanda Tips built with Expo + React Native.

## Features
- Bankroll management
- League selection (ALL, EPL, LaLiga, SerieA)
- Feasible market scan logic
- Screenshot upload using Expo Image Picker
- Gemini Vision API integration
- Dark-themed sports analytics UI
- Persistent bankroll and API key storage

## Getting started

1. Install dependencies:
   npm install

2. Start the Expo app:
   npm start

3. Run on Android/iOS emulator or device:
   - Android: npm run android
   - iOS: npm run ios

## Notes
- The app uses a mock football database and a probability engine inspired by the original HTML version.
- The Gemini API key is stored locally on the device and used only for screenshot analysis.
- To use image analysis, add a valid Gemini API key in the Scan tab.

## App structure
- `App.tsx` – app shell and tab navigation
- `src/screens` – Home, Scan, Results screens
- `src/components` – reusable UI elements
- `src/context/AppContext.tsx` – app state + local persistence
- `src/services/gemini.ts` – Gemini API request builder
- `src/services/prediction.ts` – odds/probability model
