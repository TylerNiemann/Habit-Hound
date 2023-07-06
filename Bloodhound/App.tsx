import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Pressable } from 'react-native';
import { db, enableForeignKeys} from './data/database';
import { scheduleDailyTableReset } from './data/queries';
import HabitOverlay from './components/HabitOverlay';
import WeeklyOverlay from './components/WeeklyOverrlay';
import HistoricalOverlay from './components/HistoricalOverlay';
import { Ionicons } from '@expo/vector-icons';

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
  const [historicalModalVisible, setHistoricalModalVisible] = useState(false);

  const handleModalPress = () => {
    setModalVisible(true);
  };

  const handleWeeklyPress = () => {
    setWeeklyModalVisible(true);
  };

  const handleHistoricalPress = () => {
    setHistoricalModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleWeeklyModalClose = () => {
    setWeeklyModalVisible(false);
  };

  const handleHistoricalModalClose = () => {
    setHistoricalModalVisible(false);
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
      <HistoricalOverlay
        modalVisible={historicalModalVisible}
        handleClose={handleHistoricalModalClose}
      />
      <View style={styles.buttonContainer}>
      <Pressable 
        style={[styles.checkboxBase]}
        onPress={handleModalPress }>
        {<Ionicons name="list" size={40} color="black" />}
      </Pressable>
      <Pressable 
        style={[styles.checkboxBase]}
        onPress={handleWeeklyPress }>
        {<Ionicons name="calendar" size={40} color="black" />}
      </Pressable>
      <Pressable 
        style={[styles.checkboxBase]}
        onPress={handleHistoricalPress}>
        {<Ionicons name="bar-chart" size={40} color="black" />}
      </Pressable>
      </View>
      <Image source={require('./assets/Dogs/Dog-2.png')} style={styles.image}/> 
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87cefa',
    alignItems: 'flex-end',
    paddingRight: 50,
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 100,
    gap: 20,
  },
  checkboxBase: {
    width: 40,
    height: 40,
    backgroundColor: 'transparent',
  },
  image:{
    marginRight: 110,
    marginTop: 300,
    width: 130,
    height: 130,
  }
});