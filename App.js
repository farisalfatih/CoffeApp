import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import Home from './src/screens/Home';
import Detail from './src/screens/Detail';
import Detail1 from './src/screens/Detail1';
import Detail2 from './src/screens/Detail2';
import DeliveryAddress from './src/screens/DeliveryAddress';
import DeliveryAddress1 from './src/screens/DeliveryAddress1';
import SplashScreen from './src/screens/SplashScreen';

const Stack = createNativeStackNavigator();

function App() {
  const [initialRoute, setInitialRoute] = useState('SplashScreen'); 
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setInitialRoute('Home');
      } else {
        setInitialRoute('SignIn'); 
      }
    });

    return unsubscribe; 
  }, [auth]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Detail1" component={Detail1} />
        <Stack.Screen name="Detail2" component={Detail2} />
        <Stack.Screen name="DeliveryAddress" component={DeliveryAddress} />
        <Stack.Screen name="DeliveryAddress1" component={DeliveryAddress1} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
