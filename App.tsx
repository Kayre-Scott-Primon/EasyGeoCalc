import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/data/contexts/colors';
import StatusBarCustomized from './src/components/StatusBar';
import AppNavigator from './src/routes';

const App = () => {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <StatusBarCustomized />
        <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
          <AppNavigator />
        </SafeAreaView>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;
