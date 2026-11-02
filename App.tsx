import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './src/screens/HomeScreen';
import ScanScreen from './src/screens/ScanScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import { AppProvider } from './src/context/AppContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: keyof typeof Ionicons.glyphMap = 'home';

              if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
              if (route.name === 'Scan') iconName = focused ? 'scan' : 'scan-outline';
              if (route.name === 'Results') iconName = focused ? 'bar-chart' : 'bar-chart-outline';

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#00ffcc',
            tabBarInactiveTintColor: '#8d8d8d',
            headerStyle: { backgroundColor: '#121212' },
            headerTitleStyle: { color: '#fff' },
            tabBarStyle: { backgroundColor: '#181818', borderTopColor: '#2a2a2a' },
            sceneContainerStyle: { backgroundColor: '#121212' },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Scan" component={ScanScreen} />
          <Tab.Screen name="Results" component={ResultsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
