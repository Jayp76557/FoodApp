import { View, Text, StatusBar, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
 
export default function RecipeDetailScreen(props) {
    let item = props.route.params;
    const [isFavourite, setFavourite] = useState(false);
    const navigation = useNavigation();
    
  return (
    <ScrollView
        className = "flex-1 bg-white"
        showsVerticalScrollIndicator = {false}
        contentContainerStyle={{paddingBottom: 30}}
    
    >
        <StatusBar style={"light"}/>
        <View className="flex-row justify-center">
        <Image
                    source={{ uri: item.strMealThumb }}
                    style={{ width:wp(98), height: hp(50), borderRadius: 53, borderBottomLeftRadius: 40, borderBottomRightRadius:40, marginTop: 4}}
                />
        </View>
        <View className="absolute flex-row items-center justify-between w-full pt-14">
            <TouchableOpacity onPress={()=> navigation.goBack()} className="p-2 ml-5 bg-white rounded-full">
                <ChevronLeftIcon size = {hp(3.5)} strokeWidth={4.5} color="black"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> setFavourite(!isFavourite)} className="p-2 mr-5 bg-white rounded-full">
                <HeartIcon size = {hp(3.5)} strokeWidth={4.5} color={isFavourite? "red":"gray"}/>
            </TouchableOpacity>
                
        </View>
    
    </ScrollView>
    
  )
}