import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import tw from 'twrnc';

export default function App() {
  return (
    <View style={tw`flex-1 justify-center items-center bg-black`}>
      <Text style={tw` text-white text-3xl font-bold`}>Open up App.js to start working on your 🤩😒</Text>
      <StatusBar style="light" />
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
