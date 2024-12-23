import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectResturant } from '../../features/resturantSlice'
import { removeFromBasket, selectBasketItems, selectBasketItemsWithId, selectBasketTotal } from '../../features/basketSlice'
import { LockClosedIcon } from 'react-native-heroicons/outline'
import { XCircleIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { urlFor } from '../../sanity'
import { IntlProvider, FormattedNumber } from 'react-intl';
import { ImageBackground } from 'react-native'

const BasketScreen = () => {

    // Getting all the info about the resturant using the selector function
    const resturant = useSelector(selectResturant);
    console.log(resturant);

    // to keep track of the same items
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);

    // getting the total amount 
    const basketTotal = useSelector(selectBasketTotal);
    const items = useSelector(selectBasketItems);

    const dispatch = useDispatch();
    const navigation = useNavigation();
    useMemo(() => {
        const groupedItems = items.reduce((results, item) => {
            // This function is going to return an object which will have id's corresponding to each dish and to that particular id
            //  list of the same dishes will be kept
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {})
        setGroupedItemsInBasket(groupedItems);
    }, [items]);
    console.log(groupedItemsInBasket);
    return (
        <SafeAreaView className='bg-gray-100 mt-10'>
            {/* Header */}

            <View className='p-4 relative justify-center items-center rounded-sm bg-white'>
                <Text className='text-xl font-bold'>
                    Basket
                </Text>
                <Text className='text-md text-gray-400'>
                    {resturant.title}
                </Text>
                <TouchableOpacity className='absolute right-1'>
                    <XCircleIcon color={'#00CCBB'} size={50} onPress={navigation.goBack} />
                </TouchableOpacity>
            </View>

            {/* Delivery time info */}
            <View className='bg-white mt-2 p-2 px-4 flex-row items-center mb-2'>
                <View className='flex-1 flex-row items-center gap-4'>
                    <Image source={{
                        uri: 'https://links.papareact.com/wru'
                    }}
                        className='h-10 w-10 rounded-full bg-gray-300' />
                    <Text className='text-md'>
                        Deliver in 50-70 minutes
                    </Text>
                </View>
                <Text className='text-[#00CCBB] text-md'>
                    Change
                </Text>
            </View>

            <ScrollView className='divide-y divide-gray-200'>
                {/* Order details  */}
                {Object.entries(groupedItemsInBasket).map(([key, item]) => (
                    <View key={key} className='bg-white flex-row items-center space-x-2 py-2 px-3'>
                        <Text className='text-[#00CCBB]'>{item.length} x</Text>
                        <Image
                            source={{
                                uri: urlFor(item[0]?.image).url()
                            }}
                            className='h-12 w-12 rounded-full' />
                        <Text className='flex-1'>{item[0]?.name}</Text>
                        <Text className='text-gray-400'>
                            {/* <Currency quantity={item[0].price * item.length} currency='INR' /> */}
                            <IntlProvider locale="en">
                                <FormattedNumber style="currency" currency='INR' value={item[0].price * item.length} />
                            </IntlProvider>
                        </Text>
                        <TouchableOpacity>
                            <Text
                                className='text-[#00CCBB] text-xs'
                                onPress={() => dispatch(removeFromBasket({ id: key }))}>
                                Remove
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            <View className='bg-white p-5 flex justify-end mt-12 space-y-4'>
                <View className='flex-row justify-between'>
                    <Text className='text-gray-400'>Subtotal</Text>
                    <Text className='text-gray-400'>
                        {/* <Currency quantity={basketTotal} currency='INR' /> */}
                        <IntlProvider locale="en">
                            <FormattedNumber style="currency" currency='INR' value={basketTotal} />
                        </IntlProvider>
                    </Text>
                </View>
                <View className='flex-row justify-between'>
                    <Text className='text-gray-400'>
                        Delivery Fee
                    </Text>
                    <Text className='text-gray-400'>
                        {/* <Currency quantity='30' currency='INR' /> */}
                        <IntlProvider locale="en">
                            <FormattedNumber style="currency" currency='INR' value='30' />
                        </IntlProvider>
                    </Text>
                </View>
                <View className='flex-row justify-between'>
                    <Text>
                        Order Total
                    </Text>
                    <Text className='font-extrabold'>
                        {/* <Currency quantity={basketTotal + 30} currency='INR' /> */}
                        <IntlProvider locale="en">
                            <FormattedNumber style="currency" currency='INR' value={basketTotal + 30} />
                        </IntlProvider>
                    </Text>
                </View>
                <TouchableOpacity className='rounded-lg bg-[#00CCBB] p-4' onPress={() => { navigation.navigate('Delivery') }}>
                    <Text className='text-center text-white text-lg font-bold'>Place Order</Text>
                </TouchableOpacity>
            </View>
            <View className='p-5 mt-2 bg-white'>
                <Text className='text-[#00CCBB] font-extrabold text-3xl text-center '>
                            Snap Savor
                </Text>
            </View>


        </SafeAreaView>
    )
}

export default BasketScreen