import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { urlFor } from '../../sanity'
import sanityClient from '../../sanity'
import { useNavigation } from '@react-navigation/native'

const  CategoryCard = (props) => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const { imgUrl, title } = props
    const handleCategory = async () => {
        try {
            console.log(title)
            const query = `*[_type == 'resturant' && type->name == ${JSON.stringify(title)}]`;
            console.log(query);
            const params = { title };
            const result = await sanityClient.fetch(query, params)
            console.log(result);
            setData(result);
            navigation.navigate('CategoryWiseRestaurant', {data});

        }
        catch (err) {
            console.log(err);
        }
        //     const result = await sanityClient.fetch(`
        //         *[_type == 'resturant' && type->name == ${title}]
        //         {
        //             ...
        //         }
        // `, { title }).then((restaurants) => { setData(restaurants) }).catch((err) => { console.log(err.message) });
        //     console.log(result);
    }
    return (
        <TouchableOpacity className='p-1 w-28' onPress={handleCategory}>
            <Image source={{ uri: urlFor(imgUrl).url() }} className='opacity-90 h-24 w-24 rounded-md' />
            <Text className="relative bottom-10 left-1 font-bold text-white">{title}</Text>
        </TouchableOpacity>
    )
}

export default CategoryCard