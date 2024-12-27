import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native'; 
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: 'Cold Coffee',
    };
  }

  setCategory(category) {
    this.setState({ selectedCategory: category });
  }

  render() {
    const { selectedCategory } = this.state;
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>SecangkirCerita</Text>
          <Text style={styles.greeting}>Drink Menu</Text>
          <TextInput 
            style={styles.searchBar} 
            placeholder="Search" 
          />
          <Text style={styles.categoryHeader}>Categories</Text>
        </View>

        {/* Categories */}
        <View style={styles.categories}>
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === 'Cold Coffee' && styles.activeCategory,
            ]}
            onPress={() => this.setCategory('Cold Coffee')}
          >
            <Text style={styles.categoryText}>Cold Coffee</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === 'Hot Coffee' && styles.activeCategory,
            ]}
            onPress={() => this.setCategory('Hot Coffee')}
          >
            <Text style={styles.categoryText}>Hot Coffee</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === 'Health Coffee' && styles.activeCategory,
            ]}
            onPress={() => this.setCategory('Health Coffee')}
          >
            <Text style={styles.categoryText}>Health Coffee</Text>
          </TouchableOpacity>
        </View>

        {/* Coffee Items */}
        <ScrollView contentContainerStyle={styles.coffeeList}>
          <View style={styles.coffeeItem}>
            <Image source={require('../images/mochacinno.jpg')} style={styles.coffeeImage} />
            <TouchableOpacity style={styles.favoriteIcon}>
            <Icon name="heart" size={24} color="#f00" />
            </TouchableOpacity>
            <Text style={styles.coffeeTitle}>Mochaccino</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.coffeePrice}>Rp 17.000</Text>
              <TouchableOpacity style={styles.addButton}onPress={() => this.props.navigation.navigate('Detail2')}>
                <Text>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.coffeeItem} onPress={() => this.props.navigation.navigate('Detail1')}>
            <Image source={require('../images/frappucino.jpg')} style={styles.coffeeImage} />
            <TouchableOpacity style={styles.favoriteIcon}>
              <Icon name="heart" size={24} color="#f00" />
            </TouchableOpacity>
            <Text style={styles.coffeeTitle}>Frappuccino</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.coffeePrice}>Rp 18.000</Text>
              <TouchableOpacity style={styles.addButton}onPress={() => this.props.navigation.navigate('Detail2')}>
                <Text>+</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <View style={styles.coffeeItem}>
            <Image source={require('../images/brownSugar.jpg')} style={styles.coffeeImage} />
            <Text style={styles.coffeeTitle}>Brown Sugar</Text>
            <TouchableOpacity style={styles.favoriteIcon}>
            <Icon name="heart" size={24} color="#f00" />
            </TouchableOpacity>
            <View style={styles.priceContainer}>
              <Text style={styles.coffeePrice}>Rp 17.000</Text>
              <TouchableOpacity style={styles.addButton}onPress={() => this.props.navigation.navigate('Detail2')}>
                <Text>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.coffeeItem}>
            <Image source={require('../images/iceLatte.jpg')} style={styles.coffeeImage} />
            <Text style={styles.coffeeTitle}>Ice Latte</Text>
            <TouchableOpacity style={styles.favoriteIcon}>
            <Icon name="heart" size={24} color="#f00" />
            </TouchableOpacity>
            <View style={styles.priceContainer}>
              <Text style={styles.coffeePrice}>Rp 15.000</Text>
              <TouchableOpacity style={styles.addButton}onPress={() => this.props.navigation.navigate('Detail2')}>
                <Text>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Footer Navigation */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerButton} onPress={() => this.props.navigation.navigate('Home')}>
            <Icon name="home" size={30} color="#4e2e1f" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton}>
            <Icon name="list" size={30} color="#4e2e1f" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton}>
            <Icon name="heart" size={30} color="#4e2e1f" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton}onPress={() => this.props.navigation.navigate('Detail2')}>
            <Icon name="shopping-cart" size={30} color="#4e2e1f" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton}onPress={() => this.props.navigation.navigate('DeliveryAddress')}>
            <Icon name="user" size={28} color="#4e2e1f" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3e0d1',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#4e2e1f',
  },
  greeting: {
    marginVertical: 20,
    fontSize: 25,
    color: '#4e2e1f',
  },
  searchBar: {
    width: '96%',
    padding: 10,
    borderWidth: 2,
    borderColor: '#4e2e1f',
    borderRadius: 10,
    marginBottom: 25,
  },
  categoryHeader: {
  fontSize: 25,
  fontWeight: 'bold', 
  color: '#4e2e1f',
  marginBottom: 10, 
  alignSelf: 'flex-start', 
  marginLeft: 15, // Menambahkan jarak dari sisi kiri
},
  categories: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  categoryButton: {
    padding: 15,
    borderRadius: 25,
    marginHorizontal: 15,
    backgroundColor: '#d4b895',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#4e2e1f',
  },
  activeCategory: {
    backgroundColor: '#4e2e1f',
  },
  categoryText: {
    color: '#fff',
    fontSize: 16,
  },
  coffeeList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  coffeeItem: {
    width: '45%',
    backgroundColor: '#d4b895',
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4e2e1f',
  },
  coffeeImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  imageContainer: {
  position: 'relative', 
  },
  favoriteIcon: {
  position: 'absolute',
  top: 10,
  right: 10, 
  },
  coffeeTitle: {
    fontSize: 16,
    color: '#4e2e1f',
    marginVertical: 5,
  },
  coffeePrice: {
    color: '#4e2e1f',
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    width: '60%', 
  },
  addButton: {
    backgroundColor: '#4e2e1f',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#f3e0d1',
  },
  footerButton: {
    paddingHorizontal: 15,
  },
});