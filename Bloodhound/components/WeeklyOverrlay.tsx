import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,  Modal, TouchableWithoutFeedback } from 'react-native';
import { getCountWithinCurrentWeek, getHabit } from '../data/queries';

type WeeklyOverlayProps = {
  modalVisible: boolean;
  handleClose: () => void;
 };

const WeeklyOverlay: React.FC<WeeklyOverlayProps> = ({
  modalVisible,
  handleClose,
  }) => {
    const [weeklyProgressData, setWeeklyProgressData] = useState<{ habit_reference: number; count: number; name: string; times_per_week: number }[]>([]);

  
  const handleOverlayPress = () => {
      handleClose();
    };

    useEffect(() => {
        const fetchWeeklyProgress = async () => {
            try {
                console.log('test')
              const weeklyProgress = await getCountWithinCurrentWeek();
              const updatedProgress = await Promise.all(
                weeklyProgress.map(async (habitEntry) => {
                  const additionalData = await getHabit(habitEntry.habit_reference);
                  return {
                    ...habitEntry,
                    name: additionalData.name,
                    times_per_week: additionalData.times_per_week,
                  };
                })
              );
              setWeeklyProgressData(updatedProgress);
            } catch (error) {
              console.error(error);
            }
          };
      
          fetchWeeklyProgress();
      }, [modalVisible])

  return (
    <Modal visible={modalVisible} transparent={true} animationType="fade">
    <TouchableWithoutFeedback onPress={handleOverlayPress}>
    <View style={styles.overlayContainer}>
        <TouchableWithoutFeedback>
        <View style={styles.overlayContent}>
        {weeklyProgressData.map((habitEntry) => (
        <Text style={styles.overlayText}
              key={habitEntry.habit_reference}>
            {habitEntry.name}
            {habitEntry.count}
            {habitEntry.times_per_week}
          </Text>
      ))}
        </View>
        </TouchableWithoutFeedback>
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
    justifyContent: 'center',
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
  overlayText: {
   gap: 10,
  },
});

export default WeeklyOverlay;