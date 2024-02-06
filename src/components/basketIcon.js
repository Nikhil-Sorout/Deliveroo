import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import { selectBasketItems, selectBasketTotal } from '../../features/basketSlice';
import { IntlProvider, FormattedNumber } from 'react-intl';

const basketIcon = () => {
    const navigation = useNavigation();

    // Selecting all the items present in the basket
    const items = useSelector(selectBasketItems);

    // Calculating the total price of all items in the basket
    const basketTotal = useSelector(selectBasketTotal)

    if (items.length == 0)
        return null;
    return (
        <View className='absolute w-full bottom-10 z-50 '>
            <TouchableOpacity onPress={() => navigation.navigate('Basket')} className='bg-[#00CCBB] flex-row justify-around items-center mx-5 rounded-lg p-4 '>
                <Text className='bg-[#01A296] text-lg font-extrabold text-white px-2 py-1 rounded-sm'>
                    {items.length}
                </Text>
                <Text className='text-lg text-white font-extrabold flex-1 text-center '>
                    View Basket
                </Text>
                <Text className='text-lg text-white font-extrabold'>
                    {/* <Currency quantity={basketTotal} currency='INR' /> */}
                    <IntlProvider locale="en">
                        <FormattedNumber style="currency" currency='INR' value={basketTotal} />
                    </IntlProvider>
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default basketIcon