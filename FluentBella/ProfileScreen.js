
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import { auth, db } from './firebase'; // Import Firebase auth and db
import { doc, setDoc, getDoc } from 'firebase/firestore'; // For Firestore

export default function ProfileScreen() {
  const [userData, setUserData] = useState({
    firstName: '',
    age: '',
    profilePicture: '',
  });
  const [isEditing, setIsEditing] = useState(false); // State to toggle between edit and view mode
  const currentUser = auth.currentUser;

  const fetchUserData = async () => {
    try {
      const userDoc = doc(db, 'users', currentUser.uid);
      const docSnapshot = await getDoc(userDoc);

      if (docSnapshot.exists()) {
        setUserData(docSnapshot.data());
      } else {
        console.log('No user data found!');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      Alert.alert('Error', 'Failed to fetch profile data');
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchUserData();
    } else {
      Alert.alert('Error', 'User not authenticated');
    }
  }, [currentUser]);

  const handleSave = async () => {
    try {
      const userDoc = doc(db, 'users', currentUser.uid);
      await setDoc(userDoc, { ...userData }, { merge: true });
      setIsEditing(false); // Switch to view mode after saving
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      console.error('Error saving user data:', error);
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>User ID: {currentUser.uid}</Text>
      <Text style={styles.label}>Email: {currentUser.email}</Text>

      {isEditing ? (
        // Edit mode: Show text inputs for editing
        <>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={userData.firstName || ''}
            onChangeText={(text) => setUserData({ ...userData, firstName: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Age"
            keyboardType="numeric"
            value={userData.age || ''}
            onChangeText={(text) => setUserData({ ...userData, age: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Profile Picture URL"
            value={userData.profilePicture || ''}
            onChangeText={(text) => setUserData({ ...userData, profilePicture: text })}
          />

          {userData.profilePicture ? (
            <Image source={{ uri: userData.profilePicture }} style={styles.profilePicture} />
          ) : null}

          <Button title="Save" onPress={handleSave} />
        </>
      ) : (
        // View mode: Display profile data
        <>
          <Text style={styles.label}>First Name: {userData.firstName || 'N/A'}</Text>
          <Text style={styles.label}>Age: {userData.age || 'N/A'}</Text>
          {userData.profilePicture ? (
            <Image source={{ uri: userData.profilePicture }} style={styles.profilePicture} />
          ) : (
            <Text style={styles.label}>Profile picture not set</Text>
          )}

          <Button title="Edit Profile" onPress={() => setIsEditing(true)} />
        </>
      )}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
});






