import { db } from './database';

export function clearHabitTable(): void {
    db.transaction((tx) => {
      tx.executeSql(
        `
        DELETE FROM Habit;
        `,
        [],
        (_, result) => {
          console.log('Table cleared');
        }
      );
    });
  }