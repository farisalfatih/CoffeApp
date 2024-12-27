import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

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
const auth = getAuth(app);

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleSignUp = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert('Success', 'Account created successfully! Please log in.');
        navigation.navigate('SignIn'); // Redirect to Sign In screen after successful sign-up
      })
      .catch((error) => {
        let errorMessage = 'Something went wrong.';
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'This email is already in use.';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'The email address is invalid.';
        } else if (error.code === 'auth/weak-password') {
          errorMessage = 'The password is too weak.';
        }
        Alert.alert('Error', errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

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

      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.signInText}>
        Already have an account?{' '}
        <Text onPress={() => navigation.navigate('SignIn')} style={styles.signInLink}>
          Sign In
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
    fontFamily: 'Poppins, sans-serif',
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
  signUpButton: {
    backgroundColor: '#4e2e1f',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginTop: 10,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default SignUp;