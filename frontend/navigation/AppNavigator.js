import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import PatientFormScreen from '../screens/PatientFormScreen';
import ScanScreen from '../screens/ScanScreen';
import ResultScreen from '../screens/ResultScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ClinicsScreen from '../screens/ClinicsScreen';
import ProfileScreen from '../screens/ProfileScreen';


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />

        {/* 🔥 THIS WAS MISSING */}
        <Stack.Screen name="PatientForm" component={PatientFormScreen} />

        <Stack.Screen name="Scan" component={ScanScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="Clinics" component={ClinicsScreen} />
        {/* <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} /> */}
<Stack.Screen 
  name="Profile" 
  component={ProfileScreen} 
  options={{ headerShown: false }} 
/>

<Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
<Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}