import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
const PreparingOrderScreen = () => {

  const navigation = useNavigation();

  useEffect(()=>{
    setTimeout(()=>{
      navigation.navigate('Delivery')
    }, 4000)
  })
  return (
    <SafeAreaView className='bg-black flex-1 justify-center items-center'>
      <Animatable.Image
        source={require('../../assets/waitingTime.gif')}
        animation="slideInUp"
        iterationCount={1}
        className="h-96 w-96" />
      <Animatable.Text
        animation='slideInUp'
        iterationCount={1}
        className='text-lg text-blue-400 font-bold my-10 text-center '>Waiting for the restaurant to accept your order</Animatable.Text>

      {/* <Progress.Bar 
        animated={true}
        indeterminate={true}
        indeterminateAnimationDuration={3000}
        borderWidth={1}
        borderColor='blue'
        color='lightblue'
        /> */}
    </SafeAreaView>
  )
}

export default PreparingOrderScreen;