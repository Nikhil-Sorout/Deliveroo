import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { urlFor } from '../../sanity'
import { IntlProvider, FormattedNumber } from 'react-intl';
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/outline';
import { addToBasket, selectBasketItemsWithId, selectBasketItems, removeFromBasket } from '../../features/basketSlice';
import { useSelector, useDispatch } from 'react-redux';

const DishRow = ({ id, name, description, price, image }) => {

    const [isPressed, setIsPressed] = useState(false)

    // It is used to dispach actions to the basket slice
    const dispatch = useDispatch();

    // Creating functions that will trigger while we add/remove items to the basket

    const addItemToBasket = () => {
        dispatch(addToBasket({ id, name, description, price, image }));
    }

    const removeItemFromBasket = () => {
        dispatch(removeFromBasket({ id, name, description, price, image }));
    }

    // using the selector function from baseket slice with the help of useSelector to know about the items in the basket

    const items = useSelector((state) => selectBasketItemsWithId(state, id));
    // console.log(items);
    return (
        <>
            <TouchableOpacity onPress={() => setIsPressed(!isPressed)}
                className={`bg-white border rounded-sm border-gray-200 p-4 ${isPressed && 'border-b-0'}`}>
                <View className='flex-row'>
                    <View className='flex-1 pr-2'>
                        <Text className='text-lg mb-1'>
                            {name}
                        </Text>
                        <Text className='text-xs text-gray-400'>
                            {description}
                        </Text>
                        <Text className='text-gray-400 mt-2'>
                            {/* <Currency quantity={price} currency='INR' /> */}
                            <IntlProvider locale="en">
                                <FormattedNumber style="currency" currency='INR' value={price} />
                            </IntlProvider>
                        </Text>

                    </View>
                    <View>
                        <Image source={{ uri: urlFor(image).url() }} className='border border-[#F3F3F4] h-20 w-20 rounded-md bg-gray-300 p-4' />
                    </View>
                </View>
            </TouchableOpacity>

            {isPressed && (
                <View className='bg-white rounded-sm mb-1 px-3'>
                    <View className='flex-row space-x-2 mt-2 items-center pb-2'>
                        <MinusCircleIcon
                            disabled={!items.length}
                            onPress={removeItemFromBasket}
                            color={items.length > 0 ? '#00CCBB' : 'gray'} size={40} />
                        <Text className='text-lg'>{items.length}</Text>
                        <PlusCircleIcon
                            onPress={addItemToBasket}
                            color={'#00CCBB'} size={40} />
                    </View>
                </View>
            )}
        </>

    )
}

export default DishRow