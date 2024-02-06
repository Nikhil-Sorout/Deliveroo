import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { StarIcon } from 'react-native-heroicons/solid'
import { MapPinIcon } from 'react-native-heroicons/outline'
import { urlFor } from '../../sanity'
import { useNavigation } from '@react-navigation/native'

const SearchColumn = ({
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
            className='mr-3 rounded-md shadow bg-gray-200 flex items-center w-full p-2 '>
            <Image
                source={
                    {
                        uri: imgUrl,
                    }
                }
                className=' h-48 w-96 rounded-t-md' />

            <View className='px-3 pb-3 w-96 bg-white '>
                <Text className='font-bold text-lg pt-2'>
                    {title}
                </Text>
                <View className='flex-row items-center space-x-1'>
                    <StarIcon size={22} opacity={.5} color='green' />
                    <Text className='text-xs text-gray-500'><Text className='text-green-500'>{rating}</Text>  {genre}</Text>
                </View>
                <View className='flex-row space-x-1 items-center flex-wrap '>
                    <MapPinIcon color='gray' opacity={.4} size={22} />
                    <Text className='text-xs text-gray-500'>Nearby<Text> • {address}</Text> </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default SearchColumn