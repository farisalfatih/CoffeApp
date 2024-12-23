import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { getAuth, signInWithEmailAndPassword, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { initializeApp } from 'firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQy0HWEBabaVOseigqfWnQ5nnWYFjW8Rk",
  authDomain: "ta-moble.firebaseapp.com",
  databaseURL: "https://ta-moble-default-rtdb.firebaseio.com",
  projectId: "ta-moble",
  storageBucket: "ta-moble.firebasestorage.app",
  messagingSenderId: "797370448470",
  appId: "1:797370448470:web:fd13c3be30c0581c5f59f7",
  measurementId: "G-M4JEWN6DXR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignIn = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert('Success', 'Logged in successfully!');
        navigation.navigate('Home'); // Redirect to Home screen after successful login
      })
      .catch((error) => {
        let errorMessage = 'Something went wrong.';
        if (error.code === 'auth/user-not-found') {
          errorMessage = 'No user found with this email.';
        } else if (error.code === 'auth/wrong-password') {
          errorMessage = 'Incorrect password.';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Invalid email address.';
        }
        Alert.alert('Error', errorMessage);
      });
  };

  useEffect(() => {
    // Optionally, check if the user is already logged in when the component mounts
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate('Home'); // Redirect to Home screen if user is already logged in
      }
    });

    return unsubscribe; // Clean up the listener when the component unmounts
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity onPress={handleSignIn} style={styles.signInButton}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>

      <Text style={styles.signUpText}>
        Don't have an account?{' '}
        <Text onPress={() => navigation.navigate('SignUp')} style={styles.signUpLink}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3e0d1',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  form: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#4e2e1f',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#4e2e1f',
    marginBottom: 15,
    fontSize: 16,
  },
  forgotContainer: {
    width: '100%',
    alignItems: 'flex-end',
  },
  forgotPassword: {
    fontSize: 14,
    color: '#000',
    textDecorationLine: 'underline',
  },
  signInButton: {
    backgroundColor: '#4e2e1f',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginTop: 10,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  orText: {
    fontSize: 18,
    color: '#000',
    marginVertical: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 200,
    marginBottom: 20,
  },
  socialIcon: {
    fontSize: 30,
  },
  socialText: {
    fontSize: 18,
    color: '#000',
  },
  signUpText: {
    fontSize: 16,
    color: '#000',
  },
  signUpLink: {
    color: '#4e2e1f',
    textDecorationLine: 'underline',
  },
});

export default SignIn;
