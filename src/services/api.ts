import AsyncStorage from '@react-native-async-storage/async-storage';
import { buildPredictionResults } from './prediction';
import { UserProfile } from '../types';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

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
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    const user = data.user;
    return {
      token: data.session?.access_token || 'supabase-session',
      user: {
        id: user.id,
        name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Wanda User',
        email: user.email || email,
        plan: user.user_metadata?.plan || 'Pro',
        favoriteLeague: user.user_metadata?.favoriteLeague || 'ALL',
        bankroll: Number(user.user_metadata?.bankroll ?? 1000),
      },
    };
  }

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

export async function registerUser(name: string, email: string, password: string): Promise<AuthResponse> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          plan: 'Pro',
          favoriteLeague: 'ALL',
          bankroll: 1000,
        },
      },
    });

    if (error) throw error;

    const user = data.user;
    return {
      token: data.session?.access_token || 'supabase-session',
      user: {
        id: user.id,
        name: user.user_metadata?.full_name || name,
        email: user.email || email,
        plan: user.user_metadata?.plan || 'Pro',
        favoriteLeague: user.user_metadata?.favoriteLeague || 'ALL',
        bankroll: Number(user.user_metadata?.bankroll ?? 1000),
      },
    };
  }

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

export async function fetchLeagueFixtures(league: string, token?: string) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('predictions').select('*').limit(5);
      if (!error && Array.isArray(data) && data.length > 0) {
        return data.map((row: any) => ({
          id: row.id,
          league: row.league || league,
          fixture: row.fixture || 'Fixture',
          pick: row.pick || 'Home Win (1)',
          stakePercent: Number(row.stake_percent ?? 2.4),
          stakeAmount: Number(row.stake_amount ?? 25),
          confidence: Number(row.confidence ?? 72),
          details: row.details || 'Live data synced',
        }));
      }
    } catch (_error) {
      // fallback below
    }
  }

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
  } catch (_error) {
    // Ignore and fall back to local model when no API is configured.
  }

  return buildPredictionResults(1000, league);
}

export async function getStoredUserProfile() {
  const raw = await AsyncStorage.getItem('@wanda:user');
  return raw ? (JSON.parse(raw) as UserProfile) : null;
}
