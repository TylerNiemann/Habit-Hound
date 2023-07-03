import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,  Modal, TouchableWithoutFeedback } from 'react-native';
import { getCountWithinCurrentMonth, getHabit, getLifetimeCount } from '../data/queries';
import { getCurrentMonth } from '../utils/DateUtils';

type HistoricalOverlayProps = {
  modalVisible: boolean;
  handleClose: () => void;
 };

const HistoricalOverlay: React.FC<HistoricalOverlayProps> = ({
  modalVisible,
  handleClose,
  }) => {
    const [monthlyProgressData, setMonthlyProgressData] = useState<{ habit_reference: number; count: number; name: string;  lifetime_count: number; }[]>([]);

     const handleOverlayPress = () => {
      handleClose();
    };

    useEffect(() => {
        const fetchMonthlyProgress = async () => {
            try {
              const monthlyProgress = await getCountWithinCurrentMonth();
              const updatedProgress = await Promise.all(
                monthlyProgress.map(async (habitEntry) => {
                  const additionalData = await getHabit(habitEntry.habit_reference);
                  const lifetimeCount = await getLifetimeCount();
                  return {
                    ...habitEntry,
                    name: additionalData.name,
                    lifetime_count: lifetimeCount.find((item) => item.habit_reference === habitEntry.habit_reference)?.count || 0,
                  };
                })
              );
              setMonthlyProgressData(updatedProgress);
            } catch (error) {
              console.error(error);
            }
          };
      
          fetchMonthlyProgress();

      }, [modalVisible])

  return (
    <Modal visible={modalVisible} transparent={true} animationType="fade">
    <TouchableWithoutFeedback onPress={handleOverlayPress}>
    <View style={styles.overlayContainer}>
    <Text style={styles.overlayText}>Current Month:</Text>
      {getCurrentMonth().map((date) => (
    <Text style={styles.overlayText} key={date.toString()}>
      {date}
    </Text>
  ))}
        <TouchableWithoutFeedback>
        <View style={styles.overlayContent}>
        {monthlyProgressData.map((habitEntry) => (
        <Text style={styles.overlayText}
              key={habitEntry.habit_reference}>
            {habitEntry.name}
            {habitEntry.count}
            {habitEntry.lifetime_count}
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

export default HistoricalOverlay;