import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { db, enableForeignKeys} from './data/database';
import { clearHabitTable, scheduleDailyTableReset } from './data/queries';
import HabitOverlay from './components/HabitOverlay';
import WeeklyOverlay from './components/WeeklyOverrlay';

type HabitData = {
  habit_id: number;
  name: string;
  created_date: string;
  times_per_week: number;
};

export default function App(): JSX.Element {
  const [habitData, setHabitData] = useState<HabitData[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [weeklyModalVisible, setWeeklyModalVisible] = useState(false);

  const deleteAll = () => {
    clearHabitTable();
  };

  const handleModalPress = () => {
    setModalVisible(true);
  };

  const handleWeeklyPress = () => {
    setWeeklyModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleWeeklyModalClose = () => {
    setWeeklyModalVisible(false);
  };

  useEffect(() => {
    enableForeignKeys();
    scheduleDailyTableReset();
  }, [])


  useEffect(() => {

    db.transaction((tx) => {
      tx.executeSql(
        `
        SELECT * FROM Habit;
        `,
        [],
        (_, result) => {
          const rows = result.rows;
          const habitData: HabitData[] = [];

          for (let i = 0; i < rows.length; i++) {
            habitData.push(rows.item(i) as HabitData);
          }

          setHabitData(habitData);
        }
      );
    });
  }, [habitData]);

  return (
    <View style={styles.container}>
      <HabitOverlay
        modalVisible={modalVisible}
        handleClose={handleModalClose}
        habitData={habitData}
      />
      <WeeklyOverlay
        modalVisible={weeklyModalVisible}
        handleClose={handleWeeklyModalClose}
      />
      <View style={styles.buttonContainer}>
      <Button title="Open Overlay" onPress={handleModalPress} />
      <Button title="Open Weekly Overlay" onPress={handleWeeklyPress} />
      <Button title="Delete All Habit" onPress={deleteAll} />
      </View>
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
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 100,
  },
});