# Wanda Tips Mobile

A stronger Expo mobile app foundation for Wanda Tips, with real app structure, secure local auth, AI scanning, and Supabase-ready configuration.

## Features
- Login and signup screens
- Session persistence with SecureStore and AsyncStorage
- Profile screen and bankroll tracking
- League-based prediction dashboard
- Vision AI screenshot analysis via Gemini
- Supabase-ready auth and profile integration
- Demo fallback mode so the app still works without a backend

## Install
npm install

## Run locally
npm start

Android:
npm run android

iOS:
npm run ios

## Environment setup
Create a `.env` file and add:

EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
EXPO_PUBLIC_API_URL=https://your-api-url.com
EXPO_PUBLIC_GEMINI_API_KEY=your_key_here

## Supabase setup
Use the SQL in `supabase/schema.sql` to create the required tables and policies in your Supabase project.

Then log in with the app using the Supabase auth flow. If you do not set the Supabase variables, the app automatically falls back to demo mode.

## Notes
- The app is now backend-ready for real authentication and profile storage.
- Live user data will work as soon as the Supabase config is added and the schema is created.
- AI scan still requires a valid Gemini API key.
