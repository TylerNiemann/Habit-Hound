import React, { useState }   from 'react';
import { StyleSheet, Text, View,  Modal, TouchableWithoutFeedback, Button } from 'react-native';
import HabitInput from './HabitInput';
import MyCheckbox from './Checkbox';

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
                <Text style={styles.habit}>TODAY</Text>
            {habitData.map((habit) => (
              <Text key={habit.habit_id} style={styles.habit}>
                <MyCheckbox habit_id={habit.habit_id} />
                <View style={{ paddingRight: 10}} />
                {habit.name}
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
    alignItems: 'center',
    gap: 20,
  },
  habit:{
    fontSize: 20,
    color: 'darkblue'
  },
  button:{
    marginTop: -35,
  }
});

export default HabitOverlay;