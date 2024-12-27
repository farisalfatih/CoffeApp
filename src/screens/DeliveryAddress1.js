import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { updateAddress, auth } from '../firebase/firebase';

const DeliveryAddress1 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const existingAddress = route.params?.address;

  const [name, setName] = useState(existingAddress?.name || '');
  const [detail, setDetail] = useState(existingAddress?.detail || '');
  const [phone, setPhone] = useState(existingAddress?.phone || '');

  const handleSubmit = async () => {
    if (!name || !detail || !phone) {
      alert('All fields are required!');
      return;
    }

    const addressData = {
      id: existingAddress?.id || Date.now().toString(),
      name,
      detail,
      phone,
      createdAt: existingAddress?.createdAt || new Date().toISOString()
    };

    try {
      const success = await updateAddress(addressData);
      if (success) {
        navigation.navigate('DeliveryAddress');
      } else {
        alert('Failed to save address.');
      }
    } catch (error) {
      console.error('Error saving address:', error);
      alert('An error occurred.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('DeliveryAddress')} style={styles.iconBack}>
          <Icon name="arrow-left" size={30} color="#4e2e1f" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{existingAddress ? 'Update Address' : 'Add New Address'}</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Name / Title"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Address Detail"
          value={detail}
          onChangeText={setDetail}
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>
            {existingAddress ? 'Update Address' : 'Save Address'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3e0d1',
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  iconContainer: {
    width: '100%',
    position: 'absolute',
    top: 60,
    left: 20,
  },
  iconBack: {
    padding: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  form: {
    marginTop: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#4e2e1f',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DeliveryAddress1;
