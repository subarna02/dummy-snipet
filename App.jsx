/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './src/screens/Home';
import Profile from './src/screens/Todo';
import {NavigationContainer} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Todo from './src/screens/Todo';

const App = () => {
  const Tab = createBottomTabNavigator();

  const BottomTab = () => {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Todo') {
              iconName = focused ? 'reader-sharp' : 'reader-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: false,
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: '#aeaeae',
          tabBarShowLabel: false,
          tabBarStyle: {
            borderTopWidth: 2,
            borderWidth: 2,
            paddingTop: 10,
            position: 'absolute',
            marginBottom: 20,
            marginHorizontal: 20,
            elevation: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 50,
            height: 60,

            justifyContent: 'center',
            alignItems: 'center',
          },
        })}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Todo" component={Todo} />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <BottomTab />
    </NavigationContainer>
  );
};

export default App;
