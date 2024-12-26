import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { auth } from './FluentBella/firebase';
import LoginScreen from './FluentBella/LoginScreen';
import SignUpScreen from './FluentBella/SignUpScreen';
import HomeScreen from './FluentBella/HomeScreen';
import AvatarScreen from './FluentBella/AvatarScreen';
import ProfileScreen from './FluentBella/ProfileScreen';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (currentUser) => {
        setUser(currentUser);
      },
      (error) => {
        console.error('Error in authentication state change:', error);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
            <>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Avatar"
                component={AvatarScreen}
                options={{ title: 'Avatar' }}
              />
              <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: 'Your Profile' }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{ title: 'Create Account' }}
              />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ title: 'Sign In' }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
  );
}
