import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React from 'react'

const errorModal = ({ visible, errorMessage, onClose }) => {
    return (
        <Modal transparent visible={visible}>
            <View className='flex bg-stone-200 justify-center items-center w-full h-full shadow shadow-emerald-400 px-4'>
                <Text className='text-xl font-bold text-[#00CCBB]'>
                    {errorMessage?.message}
                </Text>
                <TouchableOpacity className='mt-5' onPress={onClose}>
                    <Text className='text-md font-bold text-gray-400'>
                        Close
                    </Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

export default errorModal