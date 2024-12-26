import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { GLView } from 'expo-gl'; // For rendering WebGL content
import { Renderer } from 'expo-three';
import * as THREE from 'three';
import { Asset } from 'expo-asset';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'; // Works with expo-three

const Avatar = ({ modelUri }) => {
  const [loading, setLoading] = useState(true);

  const onContextCreate = async (gl) => {
    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );
    camera.position.x = 0;
    camera.position.y = 3;
    camera.position.z = 2;

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 20, 10);
    scene.add(ambientLight, directionalLight);

    // Set the background
    const bgAsset = Asset.fromModule(require('./assets/textures/Background.png')); // Path to your background image
    await bgAsset.downloadAsync();

    const textureLoader = new THREE.TextureLoader();
    const backgroundTexture = textureLoader.load(bgAsset.localUri || bgAsset.uri);
    scene.background = backgroundTexture;

    // Load the GLTF model
    const asset = Asset.fromURI(modelUri);
    await asset.downloadAsync();

    const loader = new GLTFLoader();
    loader.load(
      asset.localUri || modelUri,
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(2, 2, 2);
        scene.add(model);
        setLoading(false);
      },
      undefined,
      (error) => {
        console.error('Error loading GLTF model:', error);
        setLoading(false);
      }
    );

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };

    animate();
  };

  return (
    <View style={{ flex: 1 }}>
      <GLView style={{ flex: 1 }} onContextCreate={onContextCreate} />
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading 3D model...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    zIndex: 1,
    alignItems: 'center',
  },
});

export default Avatar;
