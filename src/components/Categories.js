import {ScrollView, View, Text } from 'react-native'
import React, {useState,useEffect} from 'react'
import CategoryCard from './CategoryCard'
import client, { urlFor } from '../../sanity';

const Categories = () => {
  const [categories, setCategories] = useState();
  useEffect(()=>{
    client.fetch(
      `*[_type=='category']`
    ) .then((data)=>{setCategories(data)})
  })
  return (
    <ScrollView contentContainerStyle={{
        paddingHorizontal: 10,
        paddingTop: 10,
    }} horizontal showsHorizontalScrollIndicator={false}>
      
      {/* Category card */}
      {categories?.map((category)=>(
        <CategoryCard 
          imgUrl = {category.image} title={category.name}
          key={category._id}/>
      ))}
      
    </ScrollView>
  )
}

export default Categories;