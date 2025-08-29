import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/Home';
import Area from '../pages/Area';
import Distance from '../pages/Distance';
import Info from '../pages/Info';
import Forms from '../pages/Forms';

const { Navigator, Screen } = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Home" component={Home} />
        <Screen name="Area" component={Area} />
        <Screen name="Distance" component={Distance} />
        <Screen name="Info" component={Info} />
        <Screen name="Forms" component={Forms} />
      </Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
