import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { PredictionResult, UserProfile } from '../types';

const STORAGE_KEYS = {
  bankroll: '@wanda:bankroll',
  league: '@wanda:league',
  apiKey: '@wanda:apiKey',
  results: '@wanda:results',
  user: '@wanda:user',
  token: '@wanda:token',
};

type AppContextType = {
  isAuthenticated: boolean;
  token: string | null;
  user: UserProfile | null;
  bankroll: number;
  selectedLeague: string;
  apiKey: string;
  results: PredictionResult[];
  setBankroll: (value: number) => Promise<void>;
  setSelectedLeague: (value: string) => Promise<void>;
  setApiKey: (value: string) => Promise<void>;
  setResults: (value: PredictionResult[]) => Promise<void>;
  login: (user: UserProfile, token: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (payload: Partial<UserProfile>) => Promise<void>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [bankroll, setBankrollState] = useState(1000);
  const [selectedLeague, setSelectedLeagueState] = useState('ALL');
  const [apiKey, setApiKeyState] = useState('');
  const [results, setResultsState] = useState<PredictionResult[]>([]);

  useEffect(() => {
    const hydrate = async () => {
      try {
        const [bankrollValue, leagueValue, apiKeyValue, resultsValue, storedToken, storedUser] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.bankroll),
          AsyncStorage.getItem(STORAGE_KEYS.league),
          AsyncStorage.getItem(STORAGE_KEYS.apiKey),
          AsyncStorage.getItem(STORAGE_KEYS.results),
          SecureStore.getItemAsync(STORAGE_KEYS.token),
          AsyncStorage.getItem(STORAGE_KEYS.user),
        ]);

        if (bankrollValue) setBankrollState(Number(bankrollValue) || 1000);
        if (leagueValue) setSelectedLeagueState(leagueValue);
        if (apiKeyValue) setApiKeyState(apiKeyValue);
        if (resultsValue) setResultsState(JSON.parse(resultsValue) as PredictionResult[]);
        if (storedToken) setToken(storedToken);
        if (storedUser) setUser(JSON.parse(storedUser) as UserProfile);
      } catch (error) {
        console.warn('Hydration failed', error);
      }
    };

    hydrate();
  }, []);

  const setBankroll = async (value: number) => {
    const safeValue = Number.isFinite(value) && value > 0 ? value : 1000;
    setBankrollState(safeValue);
    await AsyncStorage.setItem(STORAGE_KEYS.bankroll, String(safeValue));
  };

  const setSelectedLeague = async (value: string) => {
    setSelectedLeagueState(value);
    await AsyncStorage.setItem(STORAGE_KEYS.league, value);
  };

  const setApiKey = async (value: string) => {
    setApiKeyState(value);
    await AsyncStorage.setItem(STORAGE_KEYS.apiKey, value);
  };

  const setResults = async (value: PredictionResult[]) => {
    setResultsState(value);
    await AsyncStorage.setItem(STORAGE_KEYS.results, JSON.stringify(value));
  };

  const login = async (nextUser: UserProfile, nextToken: string) => {
    setUser(nextUser);
    setToken(nextToken);
    await AsyncStorage.setItem(STORAGE_KEYS.user, JSON.stringify(nextUser));
    await SecureStore.setItemAsync(STORAGE_KEYS.token, nextToken);
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem(STORAGE_KEYS.user);
    await SecureStore.deleteItemAsync(STORAGE_KEYS.token);
  };

  const updateProfile = async (payload: Partial<UserProfile>) => {
    if (!user) return;
    const nextUser = { ...user, ...payload };
    setUser(nextUser);
    await AsyncStorage.setItem(STORAGE_KEYS.user, JSON.stringify(nextUser));
  };

  const value = useMemo<AppContextType>(
    () => ({
      isAuthenticated: Boolean(token && user),
      token,
      user,
      bankroll,
      selectedLeague,
      apiKey,
      results,
      setBankroll,
      setSelectedLeague,
      setApiKey,
      setResults,
      login,
      logout,
      updateProfile,
    }),
    [token, user, bankroll, selectedLeague, apiKey, results],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
