import { View, Text, StatusBar, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ChevronLeftIcon, ClockIcon, FireIcon } from 'react-native-heroicons/outline';
import { HeartIcon, Square3Stack3DIcon, UserIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Loading from '../components/loading';
import YoutubeIframe from 'react-native-youtube-iframe'; 
import Animeted, { FadeInDown,FadeIn } from 'react-native-reanimated';

export default function RecipeDetailScreen(props) {
    let item = props.route.params;
    const [isFavourite, setFavourite] = useState(false);
    const navigation = useNavigation();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        getRecipeData(item.idMeal);
    },[])
    
    const getRecipeData = async (id)=>{
        try{
          const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
          console.log('got recipe data: ', response.data);
          if(response && response.data){
            setMeal(response.data.meals[0]);
            setLoading(false);
          }
        }catch(err){
          console.log('error: ',err.message);
        }
      }

      const ingredientsData = (meal)=>{
        if(!meal) return [];
        let index = [];
        for(let i=1; i<=20; i++){
          if(meal['strIngredient'+i]){
            index.push(i);
          }
        }
        return index;
      }
      const getYoutubeVideoId = url=>{
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        if (match && match[1]){
          return match[1];
        }
        return null;
      }
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
                    SharedTransitionType = {item.strMeal}
                    style={{ width:wp(98), height: hp(50), borderRadius: 53, borderBottomLeftRadius: 40, borderBottomRightRadius:40, marginTop: 4}}
                />
        </View>
        <Animeted.View entering={FadeIn.delay(200).duration(1000)} className="absolute flex-row items-center justify-between w-full pt-14">
            <TouchableOpacity onPress={()=> navigation.goBack()} className="p-2 ml-5 bg-white rounded-full">
                <ChevronLeftIcon size = {hp(3.5)} strokeWidth={4.5} color="black"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> setFavourite(!isFavourite)} className="p-2 mr-5 bg-white rounded-full">
                <HeartIcon size = {hp(3.5)} strokeWidth={4.5} color={isFavourite? "red":"gray"}/>
            </TouchableOpacity>
                
        </Animeted.View>
    {/*meal description*/}
    {
      loading ? (
        <Loading size = "large" className="mt-16"/>
      ):(
        <View className = "flex justify-between px-4 pt-8 space-y-4">
          <Animeted.View entering={FadeInDown.duration(700).springify().damping(12)} className = "space-y-2">
            <Text style={{fontSize:hp(3)}} className="flex-1 font-bold text-neutral-700">
              {meal?.strMeal}
            </Text>
            <Text style={{fontSize:hp(2)}} className="flex-1 font-medium text-neutral-500">
              {meal?.strArea}
            </Text>
          </Animeted.View>
          
          <Animeted.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} className = "flex-row justify-around">
            <View className="flex p-2 rounded-full bg-amber-300">
              <View style={{height:hp(6.5), width:hp(6.5)}} className="flex items-center justify-center bg-white rounded-full">
                <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252"/>
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text style={{fontSize: hp(2)}} className="font-bold text-neutral-700">
                  35
                </Text>
                <Text style={{fontSize: hp(1.5)}} className="font-bold text-neutral-700">
                  Mins
                </Text>
              </View>
            </View>

            <View className="flex p-2 rounded-full bg-amber-300">
              <View style={{height:hp(6.5), width:hp(6.5)}} className="flex items-center justify-center bg-white rounded-full">
                <UserIcon size={hp(4)} strokeWidth={2.5} color="#525252"/>
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text style={{fontSize: hp(2)}} className="font-bold text-neutral-700">
                  1
                </Text>
                <Text style={{fontSize: hp(1.5)}} className="font-bold text-neutral-700">
                  Serving
                </Text>
              </View>
            </View>

            <View className="flex p-2 rounded-full bg-amber-300">
              <View style={{height:hp(6.5), width:hp(6.5)}} className="flex items-center justify-center bg-white rounded-full">
                <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252"/>
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text style={{fontSize: hp(2)}} className="font-bold text-neutral-700">
                  100
                </Text>
                <Text style={{fontSize: hp(1.5)}} className="font-bold text-neutral-700">
                  Calories
                </Text>
              </View>
            </View>

            <View className="flex p-2 rounded-full bg-amber-300">
              <View style={{height:hp(6.5), width:hp(6.5)}} className="flex items-center justify-center bg-white rounded-full">
                <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color="#525252"/>
              </View>
              <View className="flex items-center py-2 space-y-1">
                {/* <Text style={{fontSize: hp(2)}} className="font-bold text-neutral-700">
                  35
                </Text> */}
                <Text style={{fontSize: hp(2)}} className="font-bold text-neutral-700">
                  Easy
                </Text>
              </View>
            </View>
            
          </Animeted.View>
          
          {/* ingeridents */}
          <Animeted.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} className="space-y-4">
            <Text style={{fontSize:hp(2.5)}} className="flex-1 font-bold text-neutral-700">
              Ingredients
            </Text>
            <View className="ml-3 space-y-2">
              {
                ingredientsData(meal).map(i=>{
                  return(
                    <View key={i} className="flex-row space-x-4">
                      <View style={{height:hp(1.5),width:hp(1.5)}}
                      className="rounded-full bg-amber-300"/>
                      <View className="flex-row space-x-2">
                        <Text style={{fontSize:hp(1.7)}} className="font-extrabold text-neutral-700">{meal['strMeasure'+i]}</Text>
                        <Text style={{fontSize:hp(1.7)}} className="font-meadium text-neutral-600">{meal['strIngredient'+i]}</Text>

                      </View>
                    </View>
                  )
                })
              }
            </View>
          </Animeted.View>

          {/* Instruction */}
          <Animeted.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} className="space-y-4">
            <Text style={{fontSize:hp(2.5)}} className="flex-1 font-bold text-neutral-700">
              Instructions
            </Text>
            <Text style={{fontSize:hp(1.6)}} className="text text-neutral-700">
              {
                meal?.strInstructions
              }
            </Text>
          </Animeted.View>
          
          {/* recipe video */}
          {
            meal.strYoutube &&(
              <Animeted.View entering={FadeInDown.delay(400).duration(700).springify().damping(12)} className="space-y-4">
                <Text style={{fontSize:hp(2.5)}} className="flex-1 font-bold text-neutral-700">
                    Recipe Video
                </Text>
                <View>
                  <YoutubeIframe 
                    videoId = {getYoutubeVideoId(meal.strYoutube)}
                    // videId="ONX74yP6JnI"
                    height = {hp(30)}/>
                </View>
              </Animeted.View>
            )
          }
        </View>
      )
      
    }
    
    </ScrollView>
    
  )
}