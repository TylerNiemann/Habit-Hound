import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, TextInput,  Button, Alert, TouchableWithoutFeedback, Keyboard, Modal} from 'react-native';
import { createHabitTable } from '../data/database';


type HabitInputProps = {
  habitModalVisible: boolean;
  handleHabitModalClose: () => void;
};


const HabitInput: React.FC<HabitInputProps> = ({
  habitModalVisible,
  handleHabitModalClose,
}) => {
  const [habitName, setHabitName] = useState('');
  const [timesPerWeek, setTimesPerWeek] = useState('');

  const handlePress = () => {
    handleHabitModalClose()
    if (habitName && timesPerWeek) {
      createHabitTable(habitName, Number(timesPerWeek));
    } else {
      Alert.alert('Please enter a habit name and times per week.');
    }
  };


  return (
    <Modal visible={habitModalVisible} transparent={true} animationType="fade">
    <TouchableWithoutFeedback
     onPress={() => {
      Keyboard.dismiss;
      handleHabitModalClose();
    }} 
     accessible={false}
     >
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
    </Modal>
  );
};

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 54,
        width: '75%',
        maxHeight: '60%',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        marginTop: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#87cefa',
      },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      backgroundColor: 'gray',
    },
   
  });
  
export default HabitInput