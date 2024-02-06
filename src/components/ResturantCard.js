import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { StarIcon } from 'react-native-heroicons/solid'
import { MapPinIcon } from 'react-native-heroicons/outline'
import { urlFor } from '../../sanity'
import { useNavigation } from '@react-navigation/native'

const ResturantCard = ({
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
}) => {
    // console.log(urlFor(imgUrl))
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('Resturant', {
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
                });
                // console.log("Navigating");
            }}
            className='mr-3 rounded-md shadow bg-white '>
            <Image
                source={
                    {
                        uri: imgUrl,
                    }
                }
                className=' h-36 w-64 rounded-t-md' />

            <View className='px-3 pb-3'>
                <Text className='font-bold text-lg pt-2'>
                    {title}
                </Text>
                <View className='flex-row items-center space-x-1'>
                    <StarIcon size={22} opacity={.5} color='green' />
                    <Text className='text-xs text-gray-500'><Text className='text-green-500'>{rating}</Text> • {genre}</Text>
                </View>
                <View className='flex-row space-x-1 items-center flex-wrap w-56'>
                    <MapPinIcon color='gray' opacity={.4} size={22} />
                    <Text className='text-xs text-gray-500'>Nearby<Text> • {address}</Text> </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ResturantCard