import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { urlFor } from '../../sanity'
import { ArrowLeftIcon, StarIcon } from 'react-native-heroicons/solid'
import { ArrowRightIcon, ChevronRightIcon, MapPinIcon, QuestionMarkCircleIcon } from 'react-native-heroicons/outline'
import DishRow from '../components/DishRow'
import { SafeAreaView } from 'react-native-safe-area-context'
import BasketIcon from '../components/basketIcon'
import { useDispatch } from 'react-redux'
import { setResturant } from '../../features/resturantSlice'


const ResturantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // Parameters recieved from resturant card

  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat
    },
  } = useRoute();

  // as soon as the components load all the info about the resturant will be sent to the resturantSlice
  useEffect(() => {
    dispatch(setResturant({ id, imgUrl, title, rating, genre, address, short_description, dishes, long, lat }))
  }, [dispatch])

  // Setting the header styles

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [])


  // console.log(dishes);

  return (
    <>
      <BasketIcon />
      <SafeAreaView>
        <ScrollView className='bg-gray-100'>
          <View className='relative'>
            <Image source={{ uri: urlFor(imgUrl).url() }}
              className='h-56 w-full bg-gray-300' />
            <TouchableOpacity className='absolute top-5 left-2 bg-gray-100 rounded-full p-2' onPress={() => {
              navigation.goBack();
            }}>
              <ArrowLeftIcon color={"#00CCBB"} size={20} />
            </TouchableOpacity>
          </View>

          <View className='p-2 pb-32'>
            <Text className='text-3xl font-bold'>{title}</Text>
            <View className='flex-row mt-2 space-x-1 items-center'>
              <StarIcon color='green' opacity={.4} size={20} />
              <Text className='text-green-400 text-xs'>{rating} • <Text className='text-gray-400'>{genre}</Text></Text>
            </View>
            <View className='flex-row items-center justify-start space-x-1'>
              <MapPinIcon color='gray' opacity={.4} size={20} />
              <Text className='text-gray-400 text-xs'>Nearby • {address}</Text>
            </View>
            <Text className='text-xs text-gray-400 mt-2 p-1 pb-4'>
              {short_description}
            </Text>
            <TouchableOpacity className='bg-white p-2 rounded-md flex-row items-center justify-between'>
              <View className=' flex-row items-center space-x-4'>
                <QuestionMarkCircleIcon color='gray' />
                <Text className='text-xs font-bold'>Hava a food allergy?</Text>
              </View>
              <ChevronRightIcon color={'#00CCBB'} size={20} />
            </TouchableOpacity>
            <View className='p-2'>
              <Text className='text-xl font-bold'>Menu</Text>
            </View>

            {/* Dish rows */}
            {dishes.map((dish) => (
              <DishRow
                key={dish._id}
                id={dish._id}
                name={dish.dish}
                description={dish.short_description}
                price={dish.price}
                image={dish.image} />
            ))}
          </View>

        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default ResturantScreen