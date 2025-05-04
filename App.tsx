import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import MainTabs from './navigation/MainTab';
import ContactDetailScreen from './screens/ContactDetailScreen';
import ConfirmAvatarScreen from './screens/ConfirmAvatarScreen';
import RegisterScreen from './screens/RegisterScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="ContactDetail" component={ContactDetailScreen} options={{ title: 'Contact Detail' }}/>
        <Stack.Screen name="ConfirmAvatar" component={ConfirmAvatarScreen} options={{ title: 'Confirm avatar' }}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
