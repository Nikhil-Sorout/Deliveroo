import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectResturant } from '../../features/resturantSlice'
import { XMarkIcon } from 'react-native-heroicons/solid'
import { TouchableOpacity } from 'react-native'
import * as Progress from 'react-native-progress'
import MapView from 'react-native-maps'

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectResturant);
  return (
    <View className='flex-1 bg-[#00CCBB]'>
      <SafeAreaView className='z-50'>
        <View className='flex-row justify-between items-center p-5'>
          <TouchableOpacity onPress={() => {
            navigation.navigate('HomeScreen')
          }}>
            <XMarkIcon color='white' size={30} />
          </TouchableOpacity>
          <Text className='text-white font-light text-lg'>
            Order Help
          </Text>
        </View>
        <View className=' bg-white p-6 rounded-md mx-5 my-2 z-50 shadow-md'>
          <View className=' flex-row justify-between items-center'>
            <View>
              <Text className='text-gray-400 text-lg'>
                Estimated Arrival
              </Text>
              <Text className='text-3xl font-bold'>
                40-45 Minutes
              </Text>
            </View>
            <Image
              source={{
                uri: 'https://links.papareact.com/fls'
              }}
              className='h-20 w-20' />
          </View>
          <Progress.Bar
            animated={true}
            indeterminate={true}
            borderColor='#00CCBB'
            color='#00CCBB'
            height={6}
            width={150}
            borderWidth={1}
          />
          <Text className='text-gray-500 mt-2'>Your order at {restaurant.title} is being prepared</Text>
        </View>
      </SafeAreaView>
      <MapView
        initialRegion={{
          latitude: restaurant?.lat || 37.78825, // Default fallback latitude
          longitude: restaurant?.long || -122.4324,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        }}
        className='flex-1 -mt-10 z-0'
        mapType='standard'
      ></MapView>
      <View className='flex-row bg-white space-x-5 py-4 items-center'>
        <Image
          source={{
            uri: "https://links.papareact.com/wru"
          }}
          className='h-12 w-12 bg-gray-300 p-4 rounded-full ml-5' />
        <View className='flex-1'>
          <Text className='text-lg'>
            James
          </Text>
          <Text className='text-gray-400'>Your Rider</Text>
        </View>
        <Text className='text-[#00CCBB] font-bold text-lg mr-5'>Call</Text>
      </View>
    </View>
  )
}

export default DeliveryScreen