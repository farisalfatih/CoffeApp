import React, { Component } from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>SecangkirCerita</Text>
          <Text style={styles.greeting}>Good Morning</Text>
          <TextInput 
            style={styles.searchBar} 
            placeholder="Search" 
          />
        </View>

        {/* Iklan Section */}
        <View style={styles.iklanContainer}>
          <Image
            source={require('../images/iklan.jpg')} 
            style={styles.iklanImage}
          />
        </View>

        {/* Daily Specials */}
        <Text style={styles.sectionTitle}>Daily Specials</Text>
        <View style={styles.specialsRow}>
          <View style={styles.specialItem}>
            <Image source={require('../images/iceLatte.jpg')} style={styles.itemImage} />
            <Text>Ice Latte</Text>
            <View style={styles.priceContainer}>
              <Text>Rp 15.000</Text>
              <TouchableOpacity style={styles.addButton}><Text>+</Text></TouchableOpacity>
            </View>
          </View>

          <View style={styles.specialItem}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail1')}>
              <Image source={require('../images/frappucino.jpg')} style={styles.itemImage} />
              <Text>Frappuccino</Text>
              <View style={styles.priceContainer}>
                <Text>Rp 18.000</Text>
                <TouchableOpacity style={styles.addButton}>
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.specialItem}>
            <Image source={require('../images/icedCoffee.jpg')} style={styles.itemImage} />
            <Text>Iced Coffee</Text>
            <View style={styles.priceContainer}>
              <Text>Rp 13.000</Text>
              <TouchableOpacity style={styles.addButton}><Text>+</Text></TouchableOpacity>
            </View>
          </View>
        </View>

        {/* More Specials */}
        <Text style={styles.sectionTitle}>More Specials</Text>
        <View style={styles.specialsColumn}>
          <View style={styles.largeSpecialItem}>
            <Image source={require('../images/coldBrew.jpg')} style={styles.itemImage} />
            <View style={styles.largeSpecialText}>
              <Text>COLD BREW Large Lemon</Text>
              <Text>Rp 20.000</Text>
            </View>
            <TouchableOpacity style={styles.addButton}><Text>+</Text></TouchableOpacity>
          </View>

          <View style={styles.largeSpecialItem}>
            <Image source={require('../images/americano.jpg')} style={styles.itemImage} />
            <View style={styles.largeSpecialText}>
              <Text>Americano Special</Text>
              <Text>Rp 18.000</Text>
            </View>
            <TouchableOpacity style={styles.addButton}><Text>+</Text></TouchableOpacity>
          </View>
        </View>

        {/* Footer Navigation */}
        <View style={styles.footer}>
          <TouchableOpacity style={{ paddingHorizontal: 30 }} onPress={() => this.props.navigation.navigate('Home')}>
            <Icon name="home" size={32} color="#4e2e1f" />
          </TouchableOpacity>
          <TouchableOpacity style={{ paddingHorizontal: 30 }} onPress={() => this.props.navigation.navigate('Detail')}>
            <Icon name="list" size={32} color="#4e2e1f" />
          </TouchableOpacity>
          <TouchableOpacity style={{ paddingHorizontal: 30 }}>
            <Icon name="heart" size={32} color="#4e2e1f" />
          </TouchableOpacity>
          <TouchableOpacity style={{ paddingHorizontal: 30 }} onPress={() => this.props.navigation.navigate('Detail2')}>
            <Icon name="shopping-cart" size={32} color="#4e2e1f" />
          </TouchableOpacity>
          <TouchableOpacity style={{ paddingHorizontal: 30 }}onPress={() => this.props.navigation.navigate('DeliveryAddress')}>
            <Icon name="user" size={32} color="#4e2e1f" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#f3e0d1',
  },
  header: {
    alignItems: 'center',
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
    marginBottom: 20,
  },
  iklanContainer: {
    alignItems: 'center',
  },
  iklanImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  sectionTitle: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#4e2e1f',
  },
  specialsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  specialsColumn: {
    marginVertical: 5,
  },
  specialItem: {
    alignItems: 'center',
    width: '30%',
    backgroundColor: '#d4b895', 
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4e2e1f',
    padding: 10, 
    marginHorizontal: 5,
  },
  largeSpecialItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#d4b895', 
    borderWidth: 2,
    borderColor: '#4e2e1f',
    borderRadius: 10,
    padding: 10,
  },
  largeSpecialText: {
    flex: 1,
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%', 
  },
  priceText: {
    marginRight: 20, 
    fontSize: 16, 
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  addButton: {
    backgroundColor: '#4e2e1f',
    padding: 5,
    borderRadius: 5,
    marginLeft: 10, 
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 20,
    position: 'absolute', 
    width: '100%',
    bottom: 1,
  },
});