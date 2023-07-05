import { Pressable, StyleSheet, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { clearHabitTable } from '../data/queries';

type DeleteHabitProps = {    
    habit_id: number;
  };

  const DeleteHabit: React.FC<DeleteHabitProps> = ({
    habit_id,
  }) => {
    
      const toggleCompleted = () => {
        Alert.alert(
            'Confirmation',
            'Are you sure you want to delete this habit?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Delete',
                onPress: () => {
                  clearHabitTable(habit_id);
                },
                style: 'destructive',
              },
            ]
          );
      };


    return (
        <>
      <Pressable 
        style={[styles.checkboxBase]}
        onPress={() => toggleCompleted() }>
        {<Ionicons name="remove-circle" size={20} color="red" />}
      </Pressable>
      </>
    );    
  }


  const styles = StyleSheet.create({
    checkboxBase: {
      width: 20,
      height: 20,
      backgroundColor: 'transparent',
    },
  });

export default DeleteHabit