import AsyncStorage from '@react-native-async-storage/async-storage';
import { buildPredictionResults } from './prediction';
import { UserProfile } from '../types';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com';

export type AuthResponse = {
  token: string;
  user: UserProfile;
};

async function request<T>(path: string, method = 'GET', body?: unknown, token?: string): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Request failed');
  }

  return (await response.json()) as T;
}

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  try {
    return await request<AuthResponse>('/auth/login', 'POST', { email, password });
  } catch (error) {
    return {
      token: 'demo-token',
      user: {
        id: 'demo-user',
        name: 'Wanda User',
        email,
        plan: 'Pro',
        favoriteLeague: 'ALL',
        bankroll: 1000,
      },
    };
  }
}

export async function registerUser(name: string, email: string, password: string): Promise<AuthResponse> {
  try {
    return await request<AuthResponse>('/auth/register', 'POST', { name, email, password });
  } catch (error) {
    return {
      token: 'demo-token',
      user: {
        id: `user-${Date.now()}`,
        name,
        email,
        plan: 'Pro',
        favoriteLeague: 'ALL',
        bankroll: 1000,
      },
    };
  }
}

export async function fetchLeagueFixtures(league: string, token?: string) {
  try {
    const data = await request<{ matches?: any[] }>('/sports/fixtures', 'POST', { league }, token);
    if (Array.isArray(data.matches) && data.matches.length > 0) {
      return data.matches.map((match: any) => ({
        id: `${match.homeTeam ?? 'home'}-${match.awayTeam ?? 'away'}`,
        league,
        fixture: `${match.homeTeam ?? 'Home'} vs ${match.awayTeam ?? 'Away'}`,
        pick: match.bestPick ?? 'Home Win (1)',
        stakePercent: match.stakePercent ?? 2.4,
        stakeAmount: match.stakeAmount ?? 25,
        confidence: match.confidence ?? 72,
        details: match.details ?? 'Value market detected',
      }));
    }
  } catch (error) {
    // Ignore and fall back to local model when no API is configured.
  }

  return buildPredictionResults(1000, league);
}

export async function getStoredUserProfile() {
  const raw = await AsyncStorage.getItem('@wanda:user');
  return raw ? (JSON.parse(raw) as UserProfile) : null;
}
