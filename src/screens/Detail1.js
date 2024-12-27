import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'; 

const Detail1 = () => {  
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('Small');
  const [milk, setMilk] = useState('Oat');
  const [cream, setCream] = useState(true);
  const [chocolateSyrup, setChocolateSyrup] = useState(true);

  const totalPrice = 18000 * quantity;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Background split into two colors */}
      <View style={styles.backgroundTop}></View>
      <View style={styles.backgroundBottom}></View>

      {/* Main content */}
      <View style={styles.content}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>SecangkirCerita</Text>
          {/* Back and Love Icons */}
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBack}>
          <Icon name="arrow-left" size={30} color="#d4b895" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('Loved!')} style={styles.iconLove}>
          <Icon name="heart" size={30} color="#d4b895" />
        </TouchableOpacity>
      </View>
        </View>

        {/* Product Image */}
        <Image source={require('../images/frappucinobg.png')} style={[styles.image, { marginTop: -30 }]} />


        {/* New View for Controls and Product Info */}
        <View style={styles.infoContainer}>
          {/* Quantity Control */}
          <View style={styles.quantityWrapper}>
            <TouchableOpacity onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          {/* Product Title */}
          <Text style={styles.productTitle}>Frappuccino</Text>

          {/* Product Description */}
          <Text style={styles.description}>
            Indulge in pure bliss with our Frappuccino! This icy concoction blends rich, smooth coffee with velvety milk,
            creating a refreshing symphony of flavors.
          </Text>

          {/* Size Selection */}
          <Text style={styles.sectionTitle}>Size</Text>
          <View style={styles.sizeOptions}>
            {['Small', 'Medium', 'Large'].map((option) => (
              <TouchableOpacity
                key={option}
                style={[styles.sizeButton, size === option && styles.selectedSizeButton]}
                onPress={() => setSize(option)}
              >
                <Text style={styles.sizeButtonText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Customization Options */}
          <Text style={styles.sectionTitle}>Customize your coffee</Text>
          <View style={styles.customOptions}>
            {/* Milk Option */}
            <TouchableOpacity onPress={() => setMilk(milk === 'Oat' ? 'Almond' : 'Oat')} style={styles.customOption}>
              <Text>🥛</Text>
              <Text> Milk</Text>
              <Text>{milk}</Text>
            </TouchableOpacity>

            {/* Cream Option */}
            <TouchableOpacity onPress={() => setCream(!cream)} style={styles.customOption}>
              <Text>🍦</Text>
              <Text> Cream</Text>
              <Text>{cream ? 'Yes' : 'No'}</Text>
            </TouchableOpacity>

            {/* Chocolate Syrup Option */}
            <TouchableOpacity onPress={() => setChocolateSyrup(!chocolateSyrup)} style={styles.customOption}>
              <Text>🍫</Text>
              <Text> Chocolate Syrup</Text>
              <Text>{chocolateSyrup ? 'Yes' : 'No'}</Text>
            </TouchableOpacity>
          </View>

          {/* Total Price */}
          <Text style={styles.totalPrice}>Total price Rp {totalPrice}</Text>

          {/* Add to Cart Button */}
          <TouchableOpacity style={styles.addToCartButton} onPress={() => navigation.navigate('Detail2')}>
  <Text style={styles.addToCartText}>Add to cart</Text>
</TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  backgroundTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: '#4e2e1f',
  },
  backgroundBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    backgroundColor: '#f3e0d1',
  },
  content: {
    padding: 35,
    zIndex: 1, 
  },
  header: {
    marginBottom: 1,
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    bottom: -1, 
  },
  iconBack: {
    position: 'absolute',
    left: 0,
  },
  iconLove: {
    position: 'absolute',
    right: 0,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#d4b895',
    marginBottom: 50,  
  },
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
    
  },
  infoContainer: {
    marginTop: -110, 
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginVertical: 5,
  },
  quantityWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4e2e1f',
    padding: 0,
    maxWidth: 115,
  },
  quantityButton: {
    paddingHorizontal: 15,
  },
  quantityButtonText: {
    fontSize: 30,
  },
  quantityText: {
    fontSize: 25,
    marginHorizontal: 10,
  },
  description: {
    fontSize: 18,
    textAlign: 'justify',
    marginVertical: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  sizeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  sizeButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4e2e1f',
    minWidth: 110,
  },
  selectedSizeButton: {
    backgroundColor: '#d4b895',
    color: '#d4b895',
  },
  sizeButtonText: {
    textAlign: 'center',
    color: '#000',
  },
  customOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  customOption: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4e2e1f',
    borderRadius: 10,
    padding: 10,
    minWidth: 100,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
  },
  addToCartButton: {
    backgroundColor: '#4e2e1f',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Detail1;