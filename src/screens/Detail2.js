import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Detail2 = () => {
  const navigation = useNavigation();
  const [frappuccinoCount, setFrappuccinoCount] = useState(1);
  const [coldBrewCount, setColdBrewCount] = useState(1);
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  
  const frappuccinoPrice = 18000;
  const coldBrewPrice = 20000;
  const discount = 0.1; 
  const validPromoCode = 'DISCOUNT10'

  // Fetch saved cart data from AsyncStorage
  const fetchCartData = async () => {
    try {
      const savedFrappuccinoCount = await AsyncStorage.getItem('frappuccinoCount');
      const savedColdBrewCount = await AsyncStorage.getItem('coldBrewCount');
      if (savedFrappuccinoCount !== null) setFrappuccinoCount(parseInt(savedFrappuccinoCount));
      if (savedColdBrewCount !== null) setColdBrewCount(parseInt(savedColdBrewCount));
    } catch (error) {
      console.error("Failed to load cart data", error);
    }
  };

  // Save cart data to AsyncStorage
  const saveCartData = async () => {
    try {
      await AsyncStorage.setItem('frappuccinoCount', frappuccinoCount.toString());
      await AsyncStorage.setItem('coldBrewCount', coldBrewCount.toString());
    } catch (error) {
      console.error("Failed to save cart data", error);
    }
  };

  useEffect(() => {
    fetchCartData(); // Load cart data when the component mounts
  }, []);

  useEffect(() => {
    saveCartData(); // Save cart data whenever the count changes
  }, [frappuccinoCount, coldBrewCount]);

  const calculateTotal = () => {
    const total = frappuccinoCount * frappuccinoPrice + coldBrewCount * coldBrewPrice;
    return total - (isPromoApplied ? total * discount : 0); 
  };

  const handleRemoveItem = async (item) => {
    if (item === 'frappuccino') {
      setFrappuccinoCount(0);
    } else if (item === 'coldBrew') {
      setColdBrewCount(0);
    }
  };

  const handlePromoCodeApply = () => {
    if (promoCode === validPromoCode) {
      setIsPromoApplied(true);
      Alert.alert('Success', 'Promo code applied successfully!');
    } else {
      setIsPromoApplied(false);
      Alert.alert('Error', 'Invalid promo code!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SecangkirCerita</Text>

      {/* Back and Love Icons */}
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBack}>
          <Icon name="arrow-left" size={30} color="#4e2e1f" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('Loved!')} style={styles.iconLove}>
          <Icon name="heart" size={30} color="#4e2e1f" />
        </TouchableOpacity>
      </View>

      <Text style={styles.greeting}>My Cart</Text>

      {/* Frappuccino Item */}
      <View style={styles.largeSpecialItem}>
        <View style={styles.cartItem}>
          <Image source={require('../images/frappucino.jpg')} style={styles.image} />
          <View style={styles.itemDetails}>
            <Text style={styles.itemTitle}>Frappuccino</Text>
            <Text>Small, Oat Milk</Text>
            <Text>Rp {frappuccinoPrice}</Text>
            <View style={styles.counter}>
              <View style={styles.counterWrapper}>
                <TouchableOpacity onPress={() => setFrappuccinoCount(Math.max(frappuccinoCount - 1, 1))}>
                  <Text style={styles.counterButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.counterText}>{frappuccinoCount}</Text>
                <TouchableOpacity onPress={() => setFrappuccinoCount(frappuccinoCount + 1)}>
                  <Text style={styles.counterButton}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={() => handleRemoveItem('frappuccino')}>
              <Text style={styles.removeItem}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Cold Brew Item */}
      <View style={styles.largeSpecialItem}>
        <View style={styles.cartItem}>
          <Image source={require('../images/coldBrew.jpg')} style={styles.image} />
          <View style={styles.itemDetails}>
            <Text style={styles.itemTitle}>Cold Brew</Text>
            <Text>Small, Skim Milk</Text>
            <Text>Chocolate syrup</Text>
            <Text>Rp {coldBrewPrice}</Text>
            <View style={styles.counter}>
              <View style={styles.counterWrapper}>
                <TouchableOpacity onPress={() => setColdBrewCount(Math.max(coldBrewCount - 1, 1))}>
                  <Text style={styles.counterButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.counterText}>{coldBrewCount}</Text>
                <TouchableOpacity onPress={() => setColdBrewCount(coldBrewCount + 1)}>
                  <Text style={styles.counterButton}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={() => handleRemoveItem('coldBrew')}>
              <Text style={styles.removeItem}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Promo Code Section */}
      <View style={styles.summary}>
        <TextInput 
          placeholder="Promo code" 
          style={styles.promoCode} 
          placeholderTextColor="#000" 
          value={promoCode}
          onChangeText={setPromoCode}
        />
        <TouchableOpacity style={styles.applyButton} onPress={handlePromoCodeApply}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>

      {/* Cart Summary Section */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.boldText}>Cart</Text>
          <Text style={styles.boldText}>Rp {frappuccinoCount * frappuccinoPrice + coldBrewCount * coldBrewPrice}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.boldText}>Discount</Text>
          <Text style={styles.boldText}>{isPromoApplied ? `${discount * 100}%` : '0%'}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.boldText}>Total</Text>
          <Text style={styles.boldText}>Rp {calculateTotal()}</Text>
        </View>
      </View>

      {/* Add margin to create more space below the summary */}
      <View style={styles.spacing} />

      <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('DeliveryAddress')}>
        <Text style={styles.checkoutText}>Check Out</Text>
      </TouchableOpacity>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Home')}>
          <Icon name="home" size={30} color="#4e2e1f" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Detail')}>
          <Icon name="list" size={30} color="#4e2e1f" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Icon name="heart" size={30} color="#4e2e1f" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Icon name="shopping-cart" size={30} color="#4e2e1f" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}onPress={() => navigation.navigate('DeliveryAddress')}>
          <Icon name="user" size={28} color="#4e2e1f" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Detail2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f3e0d1',
  },
  greeting: {
    marginVertical: 10,
    fontSize: 25,
    color: '#4e2e1f',
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  iconBack: {
    position: 'absolute',
    left: 0,
  },
  iconLove: {
    position: 'absolute',
    right: 0,
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  image: {
    width: 95,
    height: 95,
    borderRadius: 8,
    marginRight: 20,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  counter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: -55,
  },
  counterWrapper: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#4e2e1f',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    marginLeft: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#f3e0d1',
  },
  counterText: {
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  counterButton: {
    fontSize: 20,
    padding: 8,
    backgroundColor: '#f3e0d1',
  },
  boldText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  promoCode: {
    padding: 12,
    flex: 1,
    marginRight: 10,
    borderRadius: 10,
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#f3e0d1', 
    borderWidth: 2,
    borderColor: '#4e2e1f', 
  },
  applyButton: {
    backgroundColor: '#4e2e1f',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  summaryContainer: {
    marginVertical: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  spacing: {
    marginBottom: 65,
  },
  checkoutButton: {
    backgroundColor: '#4e2e1f',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    position: 'absolute',
    width: '110%',
    bottom: 0,
    backgroundColor: '#f3e0d1',
  },
  footerButton: {
    alignItems: 'center',
  },
  largeSpecialItem: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginVertical: 15,
    backgroundColor: '#d4b895',
    borderWidth: 2,
    borderColor: '#4e2e1f',
    borderRadius: 10,
    padding: 10,
  },
  removeItem: {
    fontSize: 16,
    color: '#4e2e1f',
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'flex-end',
  },
});
