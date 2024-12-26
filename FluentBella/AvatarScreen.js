import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Avatar from './Avatar'; // Ensure the import path is correct
import { Asset } from 'expo-asset';

export default function AvatarScreen() {
  const [modelUri, setModelUri] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const asset = Asset.fromModule(require('./assets/models/Bella.glb')); // Ensure correct path to your model
        await asset.downloadAsync(); // Ensure the asset is downloaded
        setModelUri(asset.localUri || asset.uri); // Use the correct URI
      } catch (error) {
        console.error('Error loading model:', error);
      }
    };

    loadModel();
  }, []);

  return (
    <View style={styles.container}>
      {modelUri ? (
        <Avatar modelUri={modelUri} />
      ) : (
        <View style={styles.loadingContainer}>
          <Text>Loading Avatar...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
