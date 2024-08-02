import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronRightIcon } from 'react-native-heroicons/solid'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import ErrorModal from '../components/ErrorModal'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { localHost } from '../../helper';

const SignUpPage = () => {
    const navigation = useNavigation()
    const [isPressed, setIsPressed] = useState(false)
    const [userName, setUserName] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    // handling signup 
    const handleSignUp = async () => {

        try {
            // posting the data using axios 
            const response = await axios.post(`http://${localHost}/api/users/signup`, {
                userName, phone, password
            })
            // console.log(response);
            console.log("Data posted successfully");
            setUserName('');
            setPhone('');
            setPassword('');
            if (response.status == 201) {
                await AsyncStorage.setItem('userName', userName);
                navigation.navigate('LoginPage');
            }
        }
        catch (err) {
            console.log("Error posting data ", err.response.data.message);
            setError({
                message: err.response.data.message
            })
        }
    }

    // this function will be trigerred after tapping close 
    const closeModal = () => {
        setError(null);
        // setIsPressed(!isPressed)
    }
    // console.log(password);
    return (
        <SafeAreaView className='flex-1 bg-white'>

            {/* Error Modal component */}
            <ErrorModal visible={error !== null} errorMessage={error} onClose={closeModal} />

            <View className='flex-1 justify-center items-center'>

                {/* Welcome tag line */}
                <Text className='text-gray-400 font-bold text-center pb-2'>
                    Welcome to <Text className='text-[#00CCBB]'>Speedy Eats</Text> Exciting tastes await, just a click away
                </Text>
                {/* Logo */}
                <Image source={require('../../assets/images/delivery.jpg')} className='h-72 w-72 rounded-full ' />
                <Text className='text-[#00CCBB] font-bold text-4xl'>Sign Up</Text>

                {/* Username input field */}
                <View className={`rounded-md p-2 box-border border-[#00CCBB] border-2 w-72 mt-4`}>
                    <TextInput value={userName} className=' text-gray-400' placeholder='Username' inputMode='text' onChangeText={(userName) => { setUserName(userName) }} />
                </View>

                {/* Phone number input field */}
                <View className={`rounded-md p-2 box-border border-[#00CCBB] border-2 w-72 mt-4`}>
                    <TextInput value={phone} className=' text-gray-400' placeholder='Phone Number' inputMode='numeric' onChangeText={(phone) => { setPhone(phone) }} />
                </View>

                {/* Password field */}
                <View className={`rounded-md p-2 box-border border-[#00CCBB] border-2 w-72 mt-4`}>
                    <TextInput value={password} className=' text-gray-400' placeholder='Password' onChangeText={(password) => { setPassword(password) }} secureTextEntry={true} />
                </View>

                {/* Let's go button to post the data */}
                <TouchableOpacity onPress={handleSignUp} disabled={isPressed} className={`mt-4 bg-${isPressed ? 'white' : '[#00CCBB]'} w-32 p-2 mb-10 rounded-lg`}>
                    <Text className={`text-${isPressed ? '[#00CCBB]' : 'white'} text-center text-lg`}>
                        {isPressed ? 'Singning you in..' : "Let's Go"}
                    </Text>
                </TouchableOpacity>
                <View className='items-center gap-4'>
                    <Text className='text-[#00CCBB] text-xl font-bold'>OR</Text>

                    {/* Login option */}
                    <View className='flex-row w-72 justify-evenly items-center gap-2'>
                        <TouchableOpacity onPress={() => navigation.navigate('LoginPage')} disabled={isPressed} className={`mt-4 bg-${isPressed ? '[#00CCBB]' : 'white'} w-32 p-2 mb-10 rounded-lg`}>
                            <Text className={`text-${isPressed ? 'white' : '[#00CCBB]'} text-center font-bold text-2xl`}>
                                Log In
                            </Text>
                        </TouchableOpacity>

                        {/* <TouchableOpacity>
                            <Image source={require('../../assets/images/googleLogo.jpg')} className='h-12 w-12 rounded-full' />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
                            <Image source={require('../../assets/images/dialerLogo.jpg')} className='h-12 w-12 rounded-full' />
                        </TouchableOpacity> */}
                    </View>

                </View>
            </View>

        </SafeAreaView>
    )
}


export default SignUpPage;