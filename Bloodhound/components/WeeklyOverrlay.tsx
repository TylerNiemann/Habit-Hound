import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,  Modal, TouchableWithoutFeedback } from 'react-native';
import { getCountWithinCurrentWeek, getHabit } from '../data/queries';
import { getCurrentFullWeek } from '../utils/DateUtils';

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
        <View style={styles.overlayContent}>
          <Text style={styles.overlayText} >Weekly Progress</Text>
          <View style={styles.dates}>
            {getCurrentFullWeek().map((date) => (
              <View style={styles.dateColumn} key={date.toString()}>
                <Text style={styles.datesText}>
                  {date.toLocaleDateString(undefined, { weekday: 'short' }).slice(0, 3)}
                </Text>
                <Text style={styles.dateText}>
                  {date.toLocaleDateString(undefined, { day: '2-digit' })}
                </Text>
              </View>
            ))}
          </View>
          {weeklyProgressData.map((habitEntry) => (
            <Text style={styles.overlayText} key={habitEntry.habit_reference}>
              {habitEntry.name}
              <View style={{ paddingRight: 10 }} />
              {habitEntry.count}
              <Text style={{ paddingRight: 10 }}> / </Text>
              {habitEntry.times_per_week}
            </Text>
          ))}
        </View>
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
    marginTop: -50,
  },
  overlayContent: {
    width: '80%',
    height: '60%',
    backgroundColor: '#87cefa',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    alignItems: 'center',
  },
  overlayText: {
  marginVertical: 10,
  fontSize: 20,
  color: 'darkblue'
  },
  dates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    borderWidth: 1,
    marginTop: 5,
    padding: 5,
    borderRadius: 20,
  },
  dateColumn: {
    alignItems: 'center',
    marginTop: 10,
  },
  dateText: {
    fontSize: 20,
  color: 'white'
  },
  datesText: {
    fontSize: 20,
  color: 'red'
  },
});

export default WeeklyOverlay;