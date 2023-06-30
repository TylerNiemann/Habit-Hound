import React from 'react';
import { SafeAreaView, StyleSheet, TextInput,  Button, Alert, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { createHabitTable } from '../data/database';

export default function HabitInput(): JSX.Element {
  const [habitName, setHabitName] = React.useState('');
  const [timesPerWeek, setTimesPerWeek] = React.useState('');

  const handlePress = () => {
    if (habitName && timesPerWeek) {
      createHabitTable(habitName, Number(timesPerWeek));
    } else {
      Alert.alert('Please enter a habit name and times per week.');
    }
  };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setHabitName}
        value={habitName}
        placeholder="Habit Name"
      />
      <TextInput
        style={styles.input}
        onChangeText={setTimesPerWeek}
        value={timesPerWeek}
        placeholder="Times Per Week"
        keyboardType="numeric"
      />
      <Button 
          title="Create Habit" 
          onPress={() => {
          Keyboard.dismiss();
          handlePress();
        }}
      />
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: -200,
        width: 300,
      },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
   
  });
  