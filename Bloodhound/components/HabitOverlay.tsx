import React, { useState }   from 'react';
import { StyleSheet, Text, View,  Modal, TouchableWithoutFeedback, Button, Image } from 'react-native';
import HabitInput from './HabitInput';
import MyCheckbox from './Checkbox';
import DeleteHabit from './DeleteHabit';

type HabitOverlayProps = {
  modalVisible: boolean;
  handleClose: () => void;
  habitData: {
    habit_id: number;
    name: string;
    times_per_week: number;
  }[];
};

const HabitOverlay: React.FC<HabitOverlayProps> = ({
  modalVisible,
  handleClose,
  habitData,
}) => {
  const [habitModalVisible, setHabitModalVisible] = useState(false);
  
  const handleOverlayPress = () => {
      handleClose();
      setHabitModalVisible(false);
    };

  const handleHabitModalPress = () => {
    setHabitModalVisible(true);
  };
  
  const handleHabitModalClose = () => {
    setHabitModalVisible(false);
  };
  

  return (
    <Modal visible={modalVisible} transparent={true} animationType="fade">
    <TouchableWithoutFeedback onPress={handleOverlayPress}>
      <View style={styles.overlayContainer}>
        <TouchableWithoutFeedback>
              <View style={styles.overlayContent}>
                <Text style={styles.title}>TODAY</Text>
            {habitData.map((habit) => (
              <Text key={habit.habit_id} style={styles.habit}>
                <MyCheckbox habit_id={habit.habit_id} />
                <View style={{ paddingRight: 10}} />
                {habit.name}
                <View style={{ paddingRight: 10}} />
                <DeleteHabit habit_id={habit.habit_id} />
              </Text>
            ))}
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.button}>
        <Button title="Create New Habit" onPress={handleHabitModalPress} />
        </View>
        <HabitInput
          habitModalVisible={habitModalVisible}
          handleHabitModalClose={handleHabitModalClose}
         />
         <Image source={require('../assets/Dogs/BassetHound-1.png')} style={styles.image}/> 
      </View>
    </TouchableWithoutFeedback>
  </Modal>
);
};

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: 100,
  },
  overlayContent: {
    width: '75%',
    height: '60%',
    backgroundColor: '#87cefa',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingTop: 30,
    alignItems: 'flex-start',
    paddingLeft: 80,
    gap: 20,
  },
  habit:{
    fontSize: 20,
    color: 'darkblue'
  },
  button:{
    marginTop: -35,
  },
  title:{
    marginLeft: 35,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },
  image:{
    marginTop: -55,
    marginLeft: 240
  },
});

export default HabitOverlay;