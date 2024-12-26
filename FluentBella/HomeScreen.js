import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { auth } from './firebase'; // Import Firebase auth

export default function HomeScreen({ navigation }) {
  // Logout function
  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log('User logged out successfully');
      navigation.navigate('Login'); // Redirect to Login
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen!</Text>
      <Button 
        title="Go to Avatar Screen" 
        onPress={() => navigation.navigate('Avatar')} 
      />
      <Button 
        title="View Profile" 
        onPress={() => navigation.navigate('Profile')} 
      />
      <Button 
        title="Logout" 
        onPress={handleLogout} 
        color="red" 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
