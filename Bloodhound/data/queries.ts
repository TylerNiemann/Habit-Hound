import { db } from './database';

export function clearHabitTable(): void {
    db.transaction((tx) => {
      tx.executeSql(
        `
        DELETE FROM Habit;
        `,
        [],
        (_, result) => {
          console.log('Habit Table cleared');
        }
      );
    });
  }

  export function clearDailyTable(): void {
    db.transaction((tx) => {
      tx.executeSql(
        `
        DELETE FROM Daily;
        `,
        [],
        (_, result) => {
          console.log('Daily Table cleared');
        }
      );
    });
  }  

export async function checkDailyRow(habit_id: number): Promise<boolean>{
  return new Promise<boolean>((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT COUNT(*) AS count FROM Daily WHERE habit_reference = ?',
        [habit_id],
        (_, result) => {
          const { rows } = result;
          const count = rows.item(0).count;
          resolve(count > 0);
        },
        (_, error) => {
          console.error(error);
          return(false);
        }
      );
    });
  });
}

export const getCompletionDateFromTable = () => {
  return new Promise<Date>((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT completed_date FROM Daily LIMIT 1',
        [],
        (_, resultSet) => {
          if (resultSet.rows.length > 0) {
            const completedDate = new Date(resultSet.rows.item(0).completed_date);
            resolve(completedDate);
          } 
        }
      );
    });
  });
};


export const scheduleDailyTableReset = async () => {
  const clearAndReschedule = async () => {
    const now = new Date();
    const lastCompletionDate = await getCompletionDateFromTable(); 

    if (lastCompletionDate.getDate() < now.getDate()) {
      clearDailyTable();
    }

    // Calculate the time until the next 12:01 am incase app is running when 12:01 hits
    const nextResetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 1, 0);
    const timeUntilReset = nextResetTime.getTime() - now.getTime();

    setTimeout(clearAndReschedule, timeUntilReset);
  };

  clearAndReschedule();
};

