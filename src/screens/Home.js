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
        <ScrollView contentContainerStyle={styles.scrollContent}>
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
        </ScrollView>

        {/* Footer Navigation */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerItem} onPress={() => this.props.navigation.navigate('Home')}>
            <Icon name="home" size={28} color="#4e2e1f" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem} onPress={() => this.props.navigation.navigate('Detail')}>
            <Icon name="list" size={28} color="#4e2e1f" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem}>
            <Icon name="heart" size={28} color="#4e2e1f" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem} onPress={() => this.props.navigation.navigate('Detail2')}>
            <Icon name="shopping-cart" size={28} color="#4e2e1f" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem} onPress={() => this.props.navigation.navigate('DeliveryAddress')}>
            <Icon name="user" size={28} color="#4e2e1f" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#f3e0d1',
  },
  scrollContent: {
    paddingBottom: 50,
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#4e2e1f',
  },
  greeting: {
    marginVertical: 12,
    fontSize: 22,
    color: '#4e2e1f',
  },
  searchBar: {
    width: '90%',
    padding: 10,
    borderWidth: 1.5,
    borderColor: '#4e2e1f',
    borderRadius: 8,
    marginBottom: 16,
  },
  iklanContainer: {
    alignItems: 'center',
  },
  iklanImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  sectionTitle: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4e2e1f',
  },
  specialsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  specialsColumn: {
    marginVertical: 8,
  },
  specialItem: {
    alignItems: 'center',
    width: '30%',
    backgroundColor: '#d4b895',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#4e2e1f',
    padding: 8,
    marginHorizontal: 4,
  },
  largeSpecialItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    backgroundColor: '#d4b895',
    borderWidth: 1.5,
    borderColor: '#4e2e1f',
    borderRadius: 8,
    padding: 8,
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
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: '#4e2e1f',
    padding: 4,
    borderRadius: 4,
    marginLeft: 8,
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
  footerItem: {
    padding: 1,
  },
});
