import { db } from './database';

export function clearHabitTable(): void {
    db.transaction((tx) => {
      tx.executeSql(
        `
        DELETE FROM Habit;
        `,
        [],
        (_, result) => {
          // Handle the result if needed
          // For example, you can check the number of affected rows: result.rowsAffected
          console.log('Table cleared');
        }
      );
    });
  }