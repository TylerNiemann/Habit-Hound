import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import TextInputExample from './components/HabitInput';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{color: 'black'}} >Open up App.tsx to  on your app!</Text>
      <TextInputExample />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87cefa',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
