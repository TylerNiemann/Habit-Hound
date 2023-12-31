import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createDailyTable, createAllDatesTable } from '../data/database';
import { checkDailyRow } from '../data/queries';

type MyCheckboxProps = {    
    habit_id: number;
  };

  const MyCheckbox: React.FC<MyCheckboxProps> = ({
    habit_id,
  }) => {
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
      const checkDailyRowExistence = async () => {
        const rowExists = await checkDailyRow(habit_id);
        setCompleted(rowExists);
      };
  
      checkDailyRowExistence();
    }, []);
    
      const toggleCompleted = () => {
        setCompleted(!completed);
        createDailyTable(habit_id);
        createAllDatesTable(habit_id);
      };


    return (
        <>
        {!completed ? (
      <Pressable 
        style={[styles.checkboxBase, completed && styles.checkboxChecked]}
        onPress={() => toggleCompleted() }>
        {completed && <Ionicons name="checkmark" size={20} color="white" />}
      </Pressable>
        ) : (
        <Pressable 
        style={[styles.checkboxBase, completed && styles.checkboxChecked]}>
        {completed && <Ionicons name="checkmark" size={20} color="white" />}
      </Pressable>
      )}
      </>
    );    
  }


  const styles = StyleSheet.create({
    checkboxBase: {
      width: 24,
      height: 20,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: 'white',
      backgroundColor: 'transparent',
    },
    checkboxChecked: {
      backgroundColor: 'white',
    },
    checkboxLabel: {
      marginLeft: 8,
      fontWeight: 500,
      fontSize: 18,
    },
  });

export default MyCheckbox