import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import AllContactsScreen from '../screens/AllContactsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

// Define the possible icon names as a union type for MaterialIcons
type MaterialIconName =
  | 'people'
  | 'people-outline'
  | 'star'
  | 'star-outline'
  | 'person'
  | 'person-outline';

export default function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="AllContacts"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: MaterialIconName;

          if (route.name === 'AllContacts') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'star' : 'star-outline';
          } else {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: '#666',
        tabBarLabelStyle: { fontSize: 12, fontWeight: '500' },
        tabBarStyle: { backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e0e0e0', height: 60, paddingBottom: 5 },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="AllContacts"
        component={AllContactsScreen}
        options={{ title: 'Contacts' }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ title: 'Favorites' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}