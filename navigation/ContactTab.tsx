import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContactListScreen from '../screens/AllContactsScreen';
import ContactDetailScreen from '../screens/ContactDetailScreen';

const Stack = createNativeStackNavigator();

export default function ContactTab() {
  return (
    <Stack.Navigator initialRouteName="ContactList">
        <Stack.Screen name="ContactList" component={ContactListScreen} />
        <Stack.Screen name="ContactDetail" component={ContactDetailScreen} options={{ title: 'Contact Detail' }}/>
    </Stack.Navigator>
  );
}
