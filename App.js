import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import ResturantScreen from './src/screens/ResturantScreen';
import { Provider } from 'react-redux';
import { store } from './store';
import BasketScreen from './src/screens/BasketScreen';
import PreparingOrderScreen from './src/screens/PreparingOrderScreen';
import DeliveryScreen from './src/screens/DeliveryScreen';
import SignUpPage from './src/screens/SignUpPage';
import LoginPage from './src/screens/LoginPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserProfileScreen from './src/screens/UserProfileScreen';
import CategoryWiseRestaurant from './src/screens/CategoryWiseRestaurant';
const Stack = createNativeStackNavigator();

export default function App() {
  // setting the userToken state
  const [userToken, setUserToken] = useState(null);
  // const [userPhone, setUserPhone] = useState(null);

  // fetching user token from async storage
  useEffect(() => {
    const fetchUserToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        // const phone = await AsyncStorage.getItem('userPhone');
        setUserToken(token);
        // setUserPhone(phone);
        console.log(userToken);
        // console.log(userPhone);
      } catch (error) {
        console.error('Error fetching user token:', error);
      }
    };

    fetchUserToken();
  }, [userToken]);




  // console.log(userPhone);
  if (userToken) {
    return (
      <NavigationContainer>

        {/* Wrapping up the entire app under provider so that we can access the store globally */}

        <Provider store={store}>
          <Stack.Navigator>
            <Stack.Screen name='HomeScreen' component={HomeScreen}
              options={{ headerShown: false, presentation: 'fullScreenModal' }} />
            <Stack.Screen name='Resturant' component={ResturantScreen} />
            <Stack.Screen name='Basket' component={BasketScreen}
              options={{ headerShown: false, presentation: 'modal' }} />
            <Stack.Screen name='PreparingOrderScreen' component={PreparingOrderScreen}
              options={{ headerShown: false, presentation: 'fullScreenModal' }} />
            <Stack.Screen name='Delivery' component={DeliveryScreen}
              options={{ headerShown: false, presentation: 'modal' }} />
            <Stack.Screen name='UserProfileScreen' component={UserProfileScreen}
              options={{ headerShown: false, presentation: 'modal' }} />
            <Stack.Screen name='CategoryWiseRestaurant' component={CategoryWiseRestaurant}
              options={{ headerShown: false, presentation: 'modal' }} />
          </Stack.Navigator>
        </Provider>
      </NavigationContainer>

    );
  }
  else {
    return (
      <NavigationContainer>

        {/* Wrapping up the entire app under provider so that we can access the store globally */}

        <Provider store={store}>
          <Stack.Navigator>
            <Stack.Screen name='SignUpPage' component={SignUpPage}
              options={{ headerShown: false, presentation: 'card' }} />
            <Stack.Screen name='LoginPage' component={LoginPage}
              options={{ headerShown: false, presentation: 'card' }} />
            <Stack.Screen name='HomeScreen' component={HomeScreen}
              options={{ headerShown: false, presentation: 'fullScreenModal' }} />
            <Stack.Screen name='Resturant' component={ResturantScreen} />
            <Stack.Screen name='Basket' component={BasketScreen}
              options={{ headerShown: false, presentation: 'modal' }} />
            <Stack.Screen name='PreparingOrderScreen' component={PreparingOrderScreen}
              options={{ headerShown: false, presentation: 'fullScreenModal' }} />
            <Stack.Screen name='Delivery' component={DeliveryScreen}
              options={{ headerShown: false, presentation: 'modal' }} />
            <Stack.Screen name='UserProfileScreen' component={UserProfileScreen}
              options={{ headerShown: false, presentation: 'modal' }} />
            <Stack.Screen name='CategoryWiseRestaurant' component={CategoryWiseRestaurant}
              options={{ headerShown: false, presentation: 'modal' }} />
          </Stack.Navigator>
        </Provider>
      </NavigationContainer>

    );
  }

}

