import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { ArrowLeftCircleIcon } from 'react-native-heroicons/outline'
import axios from 'axios';
import { localHost } from '../../helper'
const UserProfileScreen = () => {

    const [userName, setUserName] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const number = await AsyncStorage.getItem('userPhone');
                const response = await axios.get(`http://${localHost}/api/users/info?query=${number}`);
                const name = response.data.userName;
                setUserName(name);
                console.log(userName);
                setPhone(number);
            }
            catch (err) {
                // res.json({ message: err.message });
                console.log(err.message);
            }
        }
        )
            ()
    }, [])



    // useEffect(() => {
    //     (async () => {
    //         const phone = await AsyncStorage.getItem('userPhone');
    //         const name = await AsyncStorage.getItem('userName');
    //         // const response = await axios.get(`http://192.168.67.51:5001/api/users/info`, { phone });
    //         setUserName(name);
    //         setPhone(phone);
    //     })
    //         ()
    // }, []);
    // // console.log(userName);
    // console.log(phone);

    const navigation = useNavigation();

    const handleLogOut = async () => {
        console.log('discarded token successfully', await AsyncStorage.getItem('userToken'))
        await AsyncStorage.removeItem('userToken');
        navigation.navigate('LoginPage');
    }

    if (userName) {

        return (
            <SafeAreaView className=' bg-white p-4 flex-col justify-between h-full'>
                <TouchableOpacity className='absolute top-10 left-2 rounded-full' onPress={() => { navigation.goBack() }}>
                    <ArrowLeftCircleIcon size={60} color="#00CCBB" />
                </TouchableOpacity>
                <View className='items-center'>
                    <Image source={require('../../assets/images/delivery.jpg')} className='h-48 w-48 rounded-full bg-gray-400' />
                    <Text className='text-center text-[#00CCBB] font-bold text-4xl'>Snap Savor</Text>
                </View>
                <View className='flex-1 mt-10 px-2'>
                    <Text className='text-gray-400 text-xl font-bold'>User Name: {userName} </Text>
                    <Text className='text-gray-400 text-xl font-bold'>Phone Number: {phone}</Text>
                </View>
                <TouchableOpacity onPress={handleLogOut} >
                    <Text className=' text-[#00CCBB] text-center font-bold text-lg'>Log Out</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}

export default UserProfileScreen