import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@wanda:geminiApiKey';

export const saveApiKey = async (key: string) => {
  await AsyncStorage.setItem(STORAGE_KEY, key);
};

export const loadApiKey = async () => {
  return AsyncStorage.getItem(STORAGE_KEY);
};
