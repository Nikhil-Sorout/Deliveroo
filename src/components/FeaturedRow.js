import { ScrollView, View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/solid'
import ResturantCard from './ResturantCard'
import sanityClient from '../../sanity'
import { urlFor } from '../../sanity'


const FeaturedRow = ({ id, title, description }) => {

  const [resturants, setResturants] = useState([]);

  useEffect(() => {
    sanityClient.fetch(`
    *[_type=='featured' && _id == $id] {
      ...,
      resturants[]->{
        ...,
        dishes[]->,
        type->{
          name
        }
      },
    }[0]
    `, { id })
      .then((data) => {
        setResturants(data?.resturants);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])
  // console.log(resturants);

  return (
    <View className='flex-1 '>
      {/* Heading of each section */}
      <View className='mt-4 flex-row items-center px-4 justify-between'>
        <Text className='font-bold text-lg'>
          {title}
        </Text>
        {/* <ArrowRightIcon color="#00CCBB" /> */}
      </View>
      <Text className='px-4 text-gray-400 text-xs'>{description}</Text>



      {/* Elements of each section */}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingTop: 10,
        }}>

        {/* Resturant card */}

        {resturants.map((restaurant) => (
          <ResturantCard
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={urlFor(restaurant.image).url()}
            address={restaurant.address}
            title={restaurant.name}
            dishes={restaurant.dishes}
            rating={restaurant.rating}
            short_description={restaurant.short_description}
            genre={restaurant.type?.name}
            long={restaurant.long}
            lat={restaurant.lat} />
        ))}


        {/* <ResturantCard /> */}

      </ScrollView>
    </View>
  )
}

export default FeaturedRow;