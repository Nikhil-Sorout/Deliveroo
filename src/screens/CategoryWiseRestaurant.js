import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import ResturantCard from '../components/ResturantCard';
import { urlFor } from '../../sanity';
import SearchColumn from '../components/SearchColumn';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Modal } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { ArrowLeftCircleIcon } from 'react-native-heroicons/solid';
const CategoryWiseRestaurant = ({ route }) => {
  // const {result} = useRoute();

  const navigation = useNavigation();

  const { data } = route.params;

  console.log(data);


  if (data.length !== 0) {
    return (
      <SafeAreaView>
        <TouchableOpacity className='p-2' onPress={()=>navigation.goBack()}>
          <ArrowLeftCircleIcon size={50} color="#00CCBB"/>
        </TouchableOpacity>
        <ScrollView
          vertical
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: 15,
            paddingTop: 10,
          }}>

          {data.map((restaurant) => (
            <SearchColumn
              key={restaurant._id}
              id={restaurant._id}
              imgUrl={urlFor(restaurant.image).url()}
              address={restaurant.address}
              title={restaurant.name}
              dishes={restaurant.dishes}
              rating={restaurant.rating}
              short_description={restaurant.short_description}
              genre={restaurant.type?.name}
              long={restaurant.long}
              lat={restaurant.lat} />
          ))}
        </ScrollView>
      </SafeAreaView>
    )
  }
  else {
    return (
      <Modal transparent visible={data.length == 0}>
        <View className=' bg-gray-200 p-2 z-30'>
          <TouchableOpacity className='' onPress={() => { navigation.navigate('HomeScreen') }}>
            <ArrowLeftCircleIcon size={50} color="#00CCBB" />
          </TouchableOpacity>
        </View>
        <View className='flex-1 items-center justify-center bg-gray-200'>
          <Text className='text-[#00CCBB] text-2xl font-bold'>Oops, nothing found !</Text>
        </View>
      </Modal>
    )
  }
}

export default CategoryWiseRestaurant