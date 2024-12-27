import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      navigation.replace('SignIn');
    }, 5000); // SplashScreen will remain visible for 5 seconds
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image 
        source={require('../images/logo.png')} // Make sure this path is correct
        style={styles.logo}
      />
      <Text style={styles.welcomeText}>Welcome to</Text>
      <Text style={styles.brandText}>SecangkirCerita</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: '#6B4226',
    fontWeight: '300',
  },
  brandText: {
    fontSize: 32,
    color: '#6B4226',
    fontWeight: 'bold',
  },
});

export default SplashScreen;
