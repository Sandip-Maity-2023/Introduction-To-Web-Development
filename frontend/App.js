import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Firebase
import { auth } from './services/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

// Screens
import HomeScreen from './screens/HomeScreen';
import PatientFormScreen from './screens/PatientFormScreen';
import ScanScreen from './screens/ScanScreen';
import ResultScreen from './screens/ResultScreen';
import ClinicsScreen from './screens/ClinicsScreen';
import HistoryScreen from './screens/HistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';

import EditProfileScreen from './screens/EditProfileScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Automatically listen for Login/Logout changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
      setUser(authenticatedUser);
      setLoading(false);
    });

    return unsubscribe; // Cleanup listener on unmount
  }, []);

  // Show a loading spinner while checking if the user is already logged in
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#011835' }}>
        <ActivityIndicator size="large" color="#00D4FF" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          
          {!user ? (
            // ✅ LOGIN SCREEN (Only shows if user is null)
            <Stack.Screen name="Login" component={LoginScreen} />
          ) : (
            // ✅ HOME STACK (Only shows if user is signed in)
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="PatientForm" component={PatientFormScreen} />
              <Stack.Screen name="Scan" component={ScanScreen} />
              <Stack.Screen name="Result" component={ResultScreen} />
              <Stack.Screen name="Clinics" component={ClinicsScreen} />
              <Stack.Screen name="History" component={HistoryScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="EditProfile" component={EditProfileScreen} />
              <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
            </>
          )}

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}