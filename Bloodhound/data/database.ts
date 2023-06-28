import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('habits.db'); 

export default db;