import { db, createHabitTable } from '../data/database';

describe('createHabitTable', () => {
  it('should create a new habit in the database', async () => {
    const habitName = 'Exercise';
    const timesPerWeek = 3;

    await createHabitTable(habitName, timesPerWeek);

    return new Promise<void>((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM Habit',
          [],
          (_, { rows }) => {
            console.log(JSON.stringify(rows));
            expect(rows.length).toBe(1);
            const habit = rows.item(0);
            expect(habit.name).toBe(habitName);
            expect(habit.times_per_week).toBe(timesPerWeek);
            resolve();
          },
          (_, error) => {
            reject(error);
            return true;
          }
        );
      });
    });
  });
});