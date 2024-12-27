import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAddress, deleteAddress, auth } from '../firebase/firebase';

const DeliveryAddress = () => {
  const navigation = useNavigation();
  const [address, setAddress] = useState(null);

  // Fetch address when component mounts and after updates
  useEffect(() => {
    const fetchAddress = async () => {
      await getAddress(setAddress);
    };

    fetchAddress();

    // Listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) {
        navigation.replace('Login');
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  const handleDelete = async () => {
    try {
      const success = await deleteAddress();
      if (success) {
        setAddress(null);
        alert('Address deleted successfully');
      } else {
        alert('Failed to delete address');
      }
    } catch (error) {
      console.error('Error deleting address:', error);
      alert('An error occurred while deleting the address');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBack}>
          <Icon name="arrow-left" size={30} color="#4e2e1f" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('Loved!')} style={styles.iconLove}>
          <Icon name="heart" size={30} color="#4e2e1f" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Delivery Address</Text>
      
      {address ? (
        <View style={styles.card}>
          <Text style={styles.addressName}>{address.name}</Text>
          <Text style={styles.addressDetail}>{address.detail}</Text>
          <Text style={styles.addressPhone}>{address.phone}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.updateButton}
              onPress={() => navigation.navigate('DeliveryAddress1', { address })}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.deleteButton} 
              onPress={handleDelete}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text style={styles.noAddress}>No address found</Text>
      )}

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('DeliveryAddress1')}
      >
        <Text style={styles.createButtonText}>Create Address</Text>
      </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    top: 60,
    paddingHorizontal: 10,
  },
  iconBack: {
    padding: 5,
  },
  iconLove: {
    padding: 5,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#EAEAEA',
    borderRadius: 10,
    padding: 20,
    marginVertical: 60,
    elevation: 2,
    shadowColor: '#000',
  },
  addressName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  addressDetail: {
    fontSize: 14,
    color: '#555',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
  },
  updateButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  deleteButton: {
    backgroundColor: '#f00',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  createButton: {
    backgroundColor: '#4e2e1f',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 'auto',
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DeliveryAddress;