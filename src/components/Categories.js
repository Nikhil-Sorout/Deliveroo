import { ScrollView, View, Text,FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import CategoryCard from './CategoryCard'
import client, { urlFor } from '../../sanity';

const Categories = () => {

  const renderCategoryCard = ({ item }) => (
    <CategoryCard
      imgUrl={item.image}
      title={item.name}
      key={item._id}
    />
  );



  const [categories, setCategories] = useState();
  useEffect(() => {
    client.fetch(
      `*[_type=='category']`
    ).then((data) => { setCategories(data) })
  })
  return (
    // <ScrollView contentContainerStyle={{
    //     paddingHorizontal: 10,
    //     paddingTop: 10,
    // }} horizontal showsHorizontalScrollIndicator={false}>

    //   {/* Category card */}
    //   {categories?.map((category)=>(
    //     <CategoryCard 
    //       imgUrl = {category.image} title={category.name}
    //       key={category._id}/>
    //   ))}

    // </ScrollView>
    <FlatList
    data={categories} // The data array for FlatList
      keyExtractor={(item) => item._id} // Unique key for each item
      renderItem={renderCategoryCard} // Function to render each category card
      horizontal // Makes the FlatList scroll horizontally
      showsHorizontalScrollIndicator={false}
       // Hides the horizontal scroll indicator
      contentContainerStyle={{
        paddingHorizontal: 10,
        paddingTop: 10,
      }} // Adjusts padding for the list container
    />
  )
}

export default Categories;