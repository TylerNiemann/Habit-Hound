import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabase('habits.db');

db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>
  console.log('Foreign keys turned on')
);

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
 

export function createDailyTable(habit_id: number): void {
  const currentDate = new Date().toISOString();

  db.transaction((tx) => {
    tx.executeSql(
      `
      CREATE TABLE IF NOT EXISTS Daily (
        completed_date DATETIME,
        habit_reference INTEGER REFERENCES Habit(habit_id)
      );
      `,
      [],
    );
    tx.executeSql(
      `
      INSERT INTO Daily (completed_date, habit_reference) VALUES (?, ?);
      `,
      [currentDate, habit_id],
    );
  });
}