import { View, Text, StatusBar, Image } from 'react-native';
import React, { useEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {

  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  const navigation = useNavigation();

  useEffect(()=>{
    ring1padding.value = 0;
    ring2padding.value = 0;

    setTimeout(()=> ring1padding.value = withSpring(ring1padding.value+hp(5)), 100);
    setTimeout(()=> ring2padding.value = withSpring(ring2padding.value+hp(5.5)), 300);

    setTimeout(()=> navigation.navigate('Home'), 2500)

  },[])

  return (
    <View className="items-center justify-center flex-1 space-y-10 bg-black">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <Animated.View className="rounded-full bg-white/20" style={{ padding:ring2padding }}>
        <Animated.View className="rounded-full bg-white/20" style={{ padding: ring1padding }}>
          <Image 
            source={require('../../assets/welcome.jpg')}
            style={{ width: hp(20), height: hp(20) }} 
            className="rounded-full"
          />
        </Animated.View>
      </Animated.View>

      <View className="flex items-center space-y-2">
        <Text style={{fontSize:hp(4)}} className="font-extrabold tracking-widest text-white">
          FOODZYY
        </Text>
        <Text style={{fontSize:hp(2)}} className="font-bold tracking-widest text-white">
          Make Your Food By Your Own
        </Text>
      </View>
    </View>
  );
}
