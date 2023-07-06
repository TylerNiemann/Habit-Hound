import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,  Modal, TouchableWithoutFeedback } from 'react-native';
import { getCountWithinCurrentMonth, getHabit, getLifetimeCount} from '../data/queries';
import { getCurrentMonth } from '../utils/DateUtils';
import LifetimeCompletionChart from './LifetimeCompletion';

type HistoricalOverlayProps = {
  modalVisible: boolean;
  handleClose: () => void;
 };

const HistoricalOverlay: React.FC<HistoricalOverlayProps> = ({
  modalVisible,
  handleClose,
  }) => {
    const [monthlyProgressData, setMonthlyProgressData] = useState<{ 
        habit_reference: number;
        count: number; name: string;  
        lifetime_count: number; 
        times_per_week: number;  
     }[]>([]);

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
                    times_per_week: additionalData.times_per_week,
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

    const lifetimeCompletion = 50;
    const possibleLifetimeCompletion = 100;

  return (
<Modal visible={modalVisible} transparent={true} animationType="fade">
  <TouchableWithoutFeedback onPress={handleOverlayPress}>
    <View style={styles.overlayContainer}>
      <View style={styles.overlayContent}>
        <View style={styles.dates}>
          {getCurrentMonth().map((date) => (
            <Text style={styles.overlayText} key={date.toString()}>
              {date}
            </Text>
          ))}
        </View>
        <Text style={styles.headerText}>      Monthly Completion                Lifetime Completion</Text>
        {monthlyProgressData.map((habitEntry) => (
          <Text style={styles.overlayText} key={habitEntry.habit_reference}>
            {habitEntry.name}
            <View style={{ paddingRight: 10}} />
              {habitEntry.count} 
              <View style={{ paddingRight: 100}} />
              {habitEntry.lifetime_count}
          </Text>
        ))}
        <View style={styles.chartContainer}>
          <LifetimeCompletionChart lifetimeCompletion={monthlyProgressData} />
        </View>
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
  },
  overlayContent: {
    width: '80%',
    height: '60%',
    backgroundColor: '#87cefa',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingTop: 30,
    alignItems: 'flex-start',
    paddingLeft: 20,
    paddingRight: 50,
    
  },
  overlayText: {
   gap: 10,
   color: 'darkblue',
   fontSize: 18,
   alignSelf: 'flex-end',
   paddingLeft: 30,
  },
  dates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  chartContainer: {
    flex: 1,
    marginTop: 20,
    width: '100%',
  },
  headerText: {
    gap: 10,
    color: 'darkblue',
    fontSize: 10,
   },
});

export default HistoricalOverlay;