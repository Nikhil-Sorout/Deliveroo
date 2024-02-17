import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronRightIcon } from 'react-native-heroicons/solid'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import ErrorModal from '../components/ErrorModal';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginPage = () => {
    const navigation = useNavigation()
    const [isPressed, setIsPressed] = useState(false)
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const handleLogin = async () => {
        // setIsPressed(!isPressed);
        try {
            const response = await axios.post(`http://192.168.67.197:5001/api/users/login`, { phone, password });
            console.log("Data posted successfully");



            console.log(response.data.accessToken);

            // using async storage to store user info
            if (response.status == 201) {
                try {
                    await AsyncStorage.setItem('userToken', response.data.accessToken);
                    await AsyncStorage.setItem('userPhone', phone);
                    // const p = await AsyncStorage.getItem('userPhone');
                    // console.log(p);
                    setPhone('');
                    setPassword('');
                    // console.log(response);
                }
                catch (e) {
                    console.log(e.message);
                }

                navigation.navigate('HomeScreen');
            }
        }
        catch (err) {
            console.log("Error posting data ", err.response.data.message);
            setError({ message: err.response.data.message });
        }
    }
    const closeModal = () => {
        // setIsPressed(!isPressed);
        setError(null);
    }
    return (
        <SafeAreaView className='flex-1 bg-white'>
            {/* Error modal setup */}
            <ErrorModal visible={error !== null} errorMessage={error} onClose={closeModal} />
            <View className='flex-1 justify-center items-center'>
                {/* Welcome tag line */}
                <Text className='text-gray-400 font-bold text-center pb-2'>
                    Welcome to <Text className='text-[#00CCBB]'>Spedy Eats</Text> Exciting tastes await, just a click away
                </Text>
                {/* Logo */}
                <Image source={require('../../assets/images/delivery.jpg')} className='h-72 w-72 rounded-full ' />
                <Text className='text-[#00CCBB] font-bold text-4xl'>Log In</Text>

                {/* Phone number input field */}
                <View className={`rounded-md p-2 box-border border-[#00CCBB] border-2 w-72 mt-4`}>
                    <TextInput value={phone} className=' text-gray-400' placeholder='Phone Number' inputMode='numeric' onChangeText={(phone) => { setPhone(phone) }} />
                </View>

                {/* Password field */}
                <View className={`rounded-md p-2 box-border border-[#00CCBB] border-2 w-72 mt-4`}>
                    <TextInput value={password} className=' text-gray-400' placeholder='Password' onChangeText={(password) => { setPassword(password) }} secureTextEntry={true} />
                </View>

                {/* Let's go button to post the data */}
                <TouchableOpacity disabled={isPressed} className={`mt-4 bg-${isPressed ? 'white' : '[#00CCBB]'} w-32 p-2 mb-10 rounded-lg`} onPress={handleLogin}>
                    <Text className={`text-${isPressed ? '[#00CCBB]' : 'white'} text-center text-lg`} >
                        Let's Go
                    </Text>
                </TouchableOpacity>

                {/* Giving user signup option */}
                <View className='items-center gap-6'>
                    <Text className='text-[#00CCBB] text-xl font-bold'>OR</Text>
                    <TouchableOpacity className='mt-4 bg-white w-32 p-2 mb-10 rounded-lg' onPress={() => navigation.navigate('SignUpPage')}>
                        <Text className='text-[#00CCBB] text-center text-2xl font-bold' >
                            Sign Up
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>

        </SafeAreaView>
    )
}

export default LoginPage