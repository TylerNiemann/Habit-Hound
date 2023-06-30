import React from 'react';
import { StyleSheet, Text, View,  Modal, TouchableWithoutFeedback, Button } from 'react-native';
import { useState } from 'react';
import HabitInput from './HabitInput';

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
            {habitData.map((habit) => (
              <Text key={habit.habit_id}>
                {habit.name} {habit.times_per_week}
              </Text>
            ))}
          </View>
        </TouchableWithoutFeedback>
        <Button title="Open Overlay" onPress={handleHabitModalPress} />
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
    width: '80%',
    height: '60%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingTop: 30,
    alignItems: 'center',
  },
});

export default HabitOverlay;