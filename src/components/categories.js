import { View, Text,ScrollView, TouchableOpacity,Image } from 'react-native'
import React from 'react'
// import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated'
import{categoryData} from '../constants'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animeted, { FadeInDown } from 'react-native-reanimated';


export default function Categories({categories, activeCategory, handleChangeCategory}) {
  return (
    <Animeted.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{paddingHorizontal:15}}>
            
            {
                categories.map((cat, index)=>{
                    let isActive = cat.strCategory==activeCategory;
                    let activeButtonClass = isActive? ' bg-amber-500 ' : ' bg-black/10 ';
                    return(
                        <TouchableOpacity
                            key={index}
                            onPress={()=> handleChangeCategory(cat.strCategory)}
                            className="flex items-center space-y-1">
                                
                                <View className={"rounded-full p-[6px]"+activeButtonClass}>
                                    <Image
                                        source={{uri:cat.strCategoryThumb}}
                                        style={{width:hp(6), height:hp(6)}}
                                        className="rounded-full"/>
                                </View>
                                <Text className="text-neutral-600" style={{fontSize:hp(1.6)}}>
                                    {cat.strCategory}
                                </Text>
                            </TouchableOpacity>
                    )
                })
            }
        </ScrollView>
    </Animeted.View>
  )
}