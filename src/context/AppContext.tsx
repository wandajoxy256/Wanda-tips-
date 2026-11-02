import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MatchFixture, PredictionResult } from '../types';

type AppContextType = {
  bankroll: number;
  selectedLeague: string;
  apiKey: string;
  results: PredictionResult[];
  setBankroll: (value: number) => void;
  setSelectedLeague: (value: string) => void;
  setApiKey: (value: string) => void;
  setResults: (value: PredictionResult[]) => void;
};

const STORAGE_KEYS = {
  bankroll: '@wanda:bankroll',
  league: '@wanda:league',
  apiKey: '@wanda:apiKey',
  results: '@wanda:results',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [bankroll, setBankrollState] = useState(1000);
  const [selectedLeague, setSelectedLeagueState] = useState('ALL');
  const [apiKey, setApiKeyState] = useState('');
  const [results, setResultsState] = useState<PredictionResult[]>([]);

  useEffect(() => {
    const loadPersisted = async () => {
      try {
        const [bankrollValue, leagueValue, keyValue, resultsValue] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.bankroll),
          AsyncStorage.getItem(STORAGE_KEYS.league),
          AsyncStorage.getItem(STORAGE_KEYS.apiKey),
          AsyncStorage.getItem(STORAGE_KEYS.results),
        ]);

        if (bankrollValue) {
          setBankrollState(Number(bankrollValue) || 1000);
        }

        if (leagueValue) {
          setSelectedLeagueState(leagueValue);
        }

        if (keyValue) {
          setApiKeyState(keyValue);
        }

        if (resultsValue) {
          setResultsState(JSON.parse(resultsValue) as PredictionResult[]);
        }
      } catch (error) {
        console.warn('Unable to load app state', error);
      }
    };

    loadPersisted();
  }, []);

  const setBankroll = async (value: number) => {
    setBankrollState(value);
    await AsyncStorage.setItem(STORAGE_KEYS.bankroll, String(value));
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

  const value = useMemo<AppContextType>(
    () => ({
      bankroll,
      selectedLeague,
      apiKey,
      results,
      setBankroll,
      setSelectedLeague,
      setApiKey,
      setResults,
    }),
    [bankroll, selectedLeague, apiKey, results],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
