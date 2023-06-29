import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Button, Modal} from 'react-native';
import TextInputExample from './components/HabitInput';
import {  db } from './data/database';
import {useEffect, useState} from 'react'
import { clearHabitTable } from './data/queries';

type HabitData = {
  habit_id: number;
  name: string;
  created_date: string;
  times_per_week: number;
};

export default function App(): JSX.Element {
  const [habitData, setHabitData] = useState<HabitData[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const deleteAll = () => {
    clearHabitTable();
  }
  const handlePress = () => {
    setModalVisible(true);
  };

  const handleClose = () => {
    setModalVisible(false);
  };

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
  }, []);

  return (    
    <View style={styles.container}>
             <View style={styles.container}>
      <Button title="Open Overlay" onPress={handlePress} />
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.overlayContainer}>
          <View style={styles.overlayContent}>
          {habitData.map((habit) => (
            <Text key={habit.habit_id}>
              {habit.name} {habit.times_per_week}
            </Text>
          ))}
          </View>
          <Button title="Close Overlay" onPress={handleClose} />
        </View>
      </Modal>
    </View>
      <Button title="Delete All Habit" onPress={deleteAll} />
      <TextInputExample />
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
  imageContainer: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  overlayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  overlayContent: {
    width: '60%',
    height: '60%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
