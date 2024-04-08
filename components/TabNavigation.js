import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import TransactionsPage from './TransactionsPage';
import SummaryPage from './SummaryPage';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor;

          if (route.name === 'Transactions') {
            iconName = focused ? 'creditcard' : 'creditcard';
            iconColor = focused ? '#007BFF' : '#999';
          } else if (route.name === 'Summary') {
            iconName = focused ? 'barchart' : 'barchart';
            iconColor = focused ? '#007BFF' : '#999';
          }

          return <AntDesign name={iconName} size={size} color={iconColor} />;
        },
        tabBarStyle: {
          backgroundColor: '#FFF',
          borderTopWidth: 0,
          elevation: 10,
        },
        tabBarActiveTintColor: '#007BFF', 
        tabBarInactiveTintColor: '#999', 
        headerStyle: {
          backgroundColor: '#007BFF',
        },
        headerTintColor: '#FFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Transactions" component={TransactionsPage} options={{ title: 'Transactions' }} />
      <Tab.Screen name="Summary" component={SummaryPage} options={{ title: 'Summary' }} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
