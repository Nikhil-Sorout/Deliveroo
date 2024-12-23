import React, { useLayoutEffect, useEffect, useState } from 'react'
import { Image, View, Text, TextInput, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { ChevronDownIcon, UserIcon, SearchIcon, AdjustmentsIcon, AdjustmentsVerticalIcon, MagnifyingGlassIcon, MapPinIcon } from 'react-native-heroicons/outline'
import Categories from '../components/Categories'
import FeaturedRow from '../components/FeaturedRow'
import sanityClient from '../../sanity'
import * as Location from 'expo-location';
import axios from 'axios'
import SearchModal from '../components/SearchModal'
import { ArrowRightCircleIcon } from 'react-native-heroicons/solid'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { localHost } from '../../helper'
import { FlatList } from 'react-native'

const HomeScreen = () => {
  const [error, setError] = useState(null);
  const [pressed, setPressed] = useState(false);

  const navigation = useNavigation();

  const [search, setSearch] = useState('')
  const [featuredCategory, setFeaturedCategory] = useState([])

  const [location, setLocation] = useState(null);

  const [address, setAddress] = useState(null);

  // For storing the restaurant info
  const [restaurants, setResturants] = useState([]);

  const renderFeaturedRow = ({ item }) => (
    <FeaturedRow
      key={item._id}
      id={item._id}
      title={item.name}
      description={item.short_description}
    />
  );



  const handleSearch = async () => {
    setPressed(!pressed);
    // const searchQuery = qs.stringify({search});
    try {
      const response = await axios.get(`http://${localHost}/api/search/restaurants?query=${search}`)
      console.log("Posted successfully");
      if (response.status == 201) {
        // storing the fetched data
        setResturants(response.data.restaurants);
        console.log(response.data.restaurants);
      }
    }
    catch (err) {
      console.log(err.response.data.message);
      setError(err.response.data.message);
    }

  }


  // useLayoutEffect works when the UI is loading
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, []
  )

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);

          let reverseGeocode = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });

          if (reverseGeocode && reverseGeocode.length > 0) {
            setAddress(reverseGeocode[0]);
          }
        }
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchLocation();
  }, []);


  // useEffect works when the component is loading
  useEffect(() => {
    (async () => {
      await sanityClient.fetch(`
    *[_type=='featured']{
      ...,
      resturants[]->{
        ...,
        dishes[]->
      } 
    }`
      ).then((data) => { setFeaturedCategory(data); }).catch((err) => { console.log(err) })
    })
      ()
  }, [])
  // console.log(location.coords.latitude);
  console.log(location);
  console.log(address);
  // console.log(featuredCategory);

  const closeModal = () => {
    navigation.navigate('HomeScreen');
    // setError(!null);
    setPressed(false);
  }

  const userProfile = async () => {
    navigation.navigate('UserProfileScreen');
    // const phone = await AsyncStorage.getItem('userPhone');
    // const response = await axios.get(`http://192.168.50.87:5001/api/users/info?query=${phone}`);
    // console.log(response);
    // await AsyncStorage.setItem('userName', response.data.userName);
    // const response = await axios.get(`http://192.168.67.51:5001/api/search/restaurants?query=${search}`)
  }


  console.log(error == null && pressed);
  if (address !== null) {


    return (
      <SafeAreaView className="bg-white pt-2">

        {/* Search Modal */}
        <SearchModal visible={(error == null && pressed)} data={restaurants} onClose={closeModal} />

        {/* Header */}

        <View className="flex-row items-center gap-4 p-2">
          <Image source={{ uri: "https://links.papareact.com/wru" }}
            className="h-12 w-12 rounded-full bg-gray-300" />
          <View className="flex-1">
            <Text className="text-gray-400">Deliever Now!</Text>
            <View className="flex-row items-center w-60 ">
              <Text className="font-bold text-md" ellipsizeMode='tail' numberOfLines={1}>
                {address.city}, {address.country}
              </Text>
              <MapPinIcon color="#00CCBB" size={20} />
            </View>
          </View>
          <TouchableOpacity onPress={userProfile}>
            <UserIcon size={35} color="#00CCBB" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}

        <View className="flex-row items-center p-2 gap-1">
          <View className="flex-row flex-1 p-1 justify-start items-center rounded-lg bg-gray-100 ">
            <View className='p-1'>
              <MagnifyingGlassIcon color="gray" size={30} />
            </View>
            <TextInput className='w-full text-gray-400'
              placeholder='Restaurants and cuisines'
              keyboardType='default'
              onChangeText={(search) => setSearch(search)}
              value={search} />
          </View>
          <TouchableOpacity onPress={handleSearch}>
            <ArrowRightCircleIcon color="#00CCBB" size={40} />
          </TouchableOpacity>
        </View>

        {/* Body */}

       
        <FlatList
          data={featuredCategory} // The data for the FlatList
          keyExtractor={(item) => item._id} // Extracting a unique key for each item
          renderItem={renderFeaturedRow} // Function to render each item
          contentContainerStyle={{
            paddingBottom: 140,
          }}
          showsVerticalScrollIndicator={false} // Hides the vertical scroll indicator
          ListHeaderComponent={<Categories />} // Add the Categories component as the header
          ListHeaderComponentStyle={{
            backgroundColor: 'gray-100',
          }}
        />

      </SafeAreaView>
    )
  }
  else {
    return (
      <SafeAreaView className="bg-white pt-2">

        {/* Search Modal */}
        <SearchModal visible={(error == null && pressed)} data={restaurants} onClose={closeModal} />

        {/* Header */}

        <View className="flex-row items-center gap-4 p-2">
          <Image source={{ uri: "https://links.papareact.com/wru" }}
            className="h-12 w-12 rounded-full bg-gray-300" />
          <View className="flex-1">
            <Text className="text-gray-400">Deliver Now!</Text>
            <View className="flex-row items-center w-60 ">
              <ActivityIndicator size="small" color="#00CCBB" />
              {/* <Text className="font-bold text-md" ellipsizeMode='tail' numberOfLines={1}>
              {address.city}, {address.country}
            </Text> */}
              <MapPinIcon color="#00CCBB" size={20} />
            </View>
          </View>
          <TouchableOpacity onPress={userProfile}>
            <UserIcon size={35} color="#00CCBB" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}

        <View className="flex-row items-center p-2 gap-1">
          <View className="flex-row flex-1 p-1 justify-start items-center rounded-lg bg-gray-100 ">
            <View className='p-1'>
              <MagnifyingGlassIcon color="gray" size={30} />
            </View>
            <TextInput className='w-full text-gray-400'
              placeholder='Resturants and cuisines'
              keyboardType='default'
              onChangeText={(search) => { setSearch(search) }}
              value={search} />
          </View>
          <TouchableOpacity onPress={handleSearch}>
            <ArrowRightCircleIcon color="#00CCBB" size={40} />
          </TouchableOpacity>
        </View>

        {/* Body */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          className='bg-gray-100'
          contentContainerStyle={{
            paddingBottom: 140,
          }}>

          {/* Categories component */}

          <Categories />

          {/* Featured row */}
          {featuredCategory?.map((category) => (
            <FeaturedRow
              key={category._id}
              id={category._id}
              title={category.name}
              description={category.short_description} />
          )
          )}
        </ScrollView>

      </SafeAreaView>
    )
  }
}



export default HomeScreen;