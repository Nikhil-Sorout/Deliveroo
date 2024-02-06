import { View, Text, Modal, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { XMarkIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { ArrowLeftCircleIcon } from 'react-native-heroicons/solid'
import ResturantCard from './ResturantCard'
import { urlFor } from '../../sanity'
import SearchColumn from './SearchColumn'


const SearchModal = ({ visible, data, onClose }) => {
    console.log(data.length);
    const navigation = useNavigation();

    if (data.length !== 0) {
        return (
            <Modal transparent visible={visible}>
                <View className=' bg-gray-200 p-2 z-30'>
                    <TouchableOpacity className='' onPress={onClose}>
                        <ArrowLeftCircleIcon size={50} color="#00CCBB" />
                    </TouchableOpacity>
                </View>
                <ScrollView
                    contentContainerStyle={{
                        paddingVertical: 15,
                        paddingTop: 10,
                    }}
                    showsVerticalScrollIndicator={false}
                    className='flex-1 bg-gray-200 '>
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
                            // genre={restaurant.image.name}
                            long={restaurant.long}
                            lat={restaurant.lat}
                        />
                    ))}

                </ScrollView>
            </Modal>
        )
    }
    else {
        return (
            <Modal transparent visible={visible}>
                <View className=' bg-gray-200 p-2 z-30'>
                    <TouchableOpacity className='' onPress={onClose}>
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


export default SearchModal