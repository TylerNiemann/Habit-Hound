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