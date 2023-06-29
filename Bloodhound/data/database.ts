import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabase('habits.db');

export function createHabitTable(habitName: string, timesPerWeek: number): void {
  const currentDate = new Date().toISOString();

  db.transaction((tx) => {
    tx.executeSql(
      `
      CREATE TABLE IF NOT EXISTS Habit (
        habit_id INTEGER PRIMARY KEY,
        name TEXT,
        created_date DATETIME,
        times_per_week INTEGER
      );
      `,
      [],
    );
    tx.executeSql(
      `
      INSERT INTO Habit (name, created_date, times_per_week) VALUES (?, ?, ?);
      `,
      [habitName, currentDate, timesPerWeek],
    );
  });
}