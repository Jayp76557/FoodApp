import { View, Text, ScrollView,Image, TextInput,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {BellIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import Categories from '../components/categories';
import axios from 'axios';
import Recipes from '../components/recipes';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export default function HomeScreen() {
const [activeCategory, setActiveCategory] = useState('Beef');
 const [categories, setCategories] = useState([]);
 const [meals, setMeals] = useState([]);
 const [searchTerm, setSearchTerm] = useState(''); // State for search input
 const [filteredMeals, setFilteredMeals] = useState([]); // State for filtered meals

  
 useEffect(()=>{
  getCategories();
  getCRecipes();
 },[])

//  useEffect(() => {
//   // Filter meals based on search term whenever it changes
//   if (searchTerm === '') {
//     setFilteredMeals(meals); // Show all meals when search term is empty
//   } else {
//     const filtered = meals.filter((meal) =>
//       meal.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredMeals(filtered);
//   }
// }, [searchTerm, meals]);

const handleChangeCategory = category=>{
  getCRecipes(category);
  setActiveCategory(category);
  setMeals([]);
  // setSearchTerm(''); // Clear search term when category changes
}
const handleSearch = () => {
  if (searchTerm.trim() !== '') {
    const filtered = meals.filter((meal) =>
      meal.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMeals(filtered);
  } else {
    setFilteredMeals(meals); // Show all meals if search is empty
  }
};

const getCategories = async ()=>{
  try{
    const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
    // console.log('got categories: ', response.data);
    if(response && response.data){
      setCategories(response.data.categories);
    }
  }catch(err){
    console.log('error: ',err.message);
  }
}
const getCRecipes = async (category="Beef")=>{
  try{
    const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    // console.log('got categories: ', response.data);
    if(response && response.data){
      setMeals(response.data.meals);
      setFilteredMeals(response.data.meals); // Initialize filtered meals
    }
  }catch(err){
    console.log('error: ',err.message);
  }
}
  return (
    <View className= "flex-1 bg-white">
      <StatusBar style="dark"/>
        <ScrollView
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 50}}
                className="space-y-6 pt-14">
          
          <View className="flex-row items-center justify-between mx-4 mb-2">
            <Image source={require('../../assets/avtar.png')} style={{height: hp(5.5), width: hp(5.5)}}/>
            <BellIcon size={hp(4)} color="gray"/>
          </View>

          <View className="mx-4 mb-2 space-y-2">
            <Text style={{fontSize: hp(1.7)}} className=" text-neutral-600">Hello, Jay!</Text>
            <View>
            <Text style={{fontSize: hp(3.8)}} className="font-semibold text-neutral-600">Make your own food,</Text>
            </View>
            <Text style={{fontSize: hp(3.8)}} className="font-semibold text-neutral-600">stay at <Text className="text-amber-400">Home</Text></Text>
          </View>

          <View className="flex-row items-center mx-4 rounded-full bg-black/5 p-[6px]">
            <TextInput
              placeholder='Search any recipe'
              placeholderTextColor={'gray'}
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
              style={{fontSize:hp(1.7)}}
              className="flex-1 pl-3 mb-1 text-base tracking-wider"/>
              
              <TouchableOpacity onPress={handleSearch}>
            <View className="p-3 bg-white rounded-full">
              <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
            </View>
          </TouchableOpacity>
          </View>
          
          {/* categories */}
          <View>
            {categories.length>0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />}
          </View>
          
          {/* Recipes or "No Recipes Found" Message */}
        <View>
          {filteredMeals.length > 0 ? (
            <Recipes meals={filteredMeals} categories={categories} />
          ) : (
            <Text className="mt-6 text-center text-gray-700" style={{ fontSize: hp(2.5) }}>
              No recipes found. Try a different search!
            </Text>
          )}
        </View>
          </ScrollView>
    </View>
  )
}